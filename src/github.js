const axios = require("axios");

async function createIssue(
  protectionSettings,
  owner,
  repo,
  branch,
  githubUsername,
  githubToken
) {
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

    const issueTitle = "Branch Protection Applied";
    const issueBody = `Hello @${githubUsername},\n\nI wanted to let you know that protections have been added to the "${branch}" branch.\n\`\`\`\nProtection settings:\n${JSON.stringify(
      protectionSettings,
      null,
      2
    )}\`\`\``;

    const response = await axios.post(
      url,
      {
        title: issueTitle,
        body: issueBody,
      },
      {
        headers,
      }
    );

    console.log("Issue created successfully", response.data);
  } catch (error) {
    console.error(
      "Error creating issue:",
      error.response ? error.response.data : error.message
    );
    throw ("Error creating issue:", error);
  }
}

async function applyBranchProtection(
  protectionSettings,
  owner,
  repo,
  branch,
  githubToken
) {
  const headers = {
    Authorization: `token ${githubToken}`,
  };

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/branches/${branch}/protection`;

    const response = await axios.put(url, protectionSettings, {
      headers,
    });
    console.log("Branch protection applied successfully:", response.data);
  } catch (error) {
    console.error(
      "Error applying branch protection:",
      error.response ? error.response.data : error.message
    );
    throw ("Error applying branch protection:", error);
  }
}

module.exports = {
  createIssue,
  applyBranchProtection,
};
