# Github Repo Protection Service

This service listens to webhook events generated during creation of a repo named `main`. It then applies branch protection rule to the repo and opens an `issue` that notifies the user of the branch protection rules that were applied.

## How to test this in action
- Go to the organisation and create a new repo: https://github.com/organizations/Planeranow/repositories/new
- Upon creation, navigate to https://github.com/Planeranow/{repo_name}/issues to check the branch protection rules applied
- Additionally, navigate to `Repo -> Settings -> Branches` to see all the branch protection rules.

## How to run this locally
- `npm install`
- `npm run start-local`
- Make sure AWS credential is setup
- Using cURL or Postman call the `/github-webhook` endpoint with sample payload:
```
{
    "action": "created",
    "repository": {
        "name": "ProtectionTest-9",
        "owner": {
            "login": "Planeranow",
        }
    }
    "sender": {
        "login": "AshwaryaSmridhi",
    }
}
```

## How to deploy your changes:
Simply run `npm run deploy-dev` to deploy all the changes. 

This service is deployed using serverless which creates the API gateway, lambda function and the permissions required.

## Reference documentations
- How to listen to webhook event from an org: https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28
- How to update branch protection rule: https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection
- How to create a new issue: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
- How does serverless deploy work: https://www.serverless.com/framework/docs/providers/aws/guide/deploying

## Things to improve
- To apply automatic branch protection for private repos we need to upgrade to Github pro.
- Better error handling for applying branch protection and creating issues
- Add tests for the functions in github.js
- Validate input data coming from the webhook