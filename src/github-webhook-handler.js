"use strict";
const { applyBranchProtection, createIssue } = require("./github");
const AWS = require("aws-sdk");


module.exports.protectRepo = async (event) => {
  if (event.path === "/github-webhook" && event.httpMethod === "POST") {
    const data = JSON.parse(event.body);

    if (data.action === "created") {
      const owner = data.repository.owner.login;
      const repo = data.repository.name;
      const branch = "main";
      const user = data.sender.login;
      const secretsManager = new AWS.SecretsManager();

      const secretName = "GithubToken";
      const githubTokenResponse = await secretsManager
        .getSecretValue({ SecretId: secretName })
        .promise();
      const githubToken = JSON.parse(githubTokenResponse.SecretString);

      const protectionSettings = {
        required_status_checks: {
          strict: true,
          contexts: ["ci-checks"],
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
          required_approving_review_count: 2,
          require_last_push_approval: true,
        },
        restrictions: null,
        allow_force_pushes: false,
      };

      await applyBranchProtection(
        protectionSettings,
        owner,
        repo,
        branch,
        githubToken.GithubToken
      );
      await createIssue(
        protectionSettings,
        owner,
        repo,
        branch,
        user,
        githubToken.GithubToken
      );

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Branch Protection Applied!",
            input: event,
            event_data: data,
            organization_name: data.organization.login,
          },
          null,
          2
        ),
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify(
      {
        message: "Path not found",
        input: event,
      },
      null,
      2
    ),
  };
};
