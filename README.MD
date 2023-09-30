## How to apply branch protection
### Add webhook in the organisation: https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28
### Everytime a repo is created, call our web service endpoint
### Give all the details to our webservice endpoint
### We then use Github API to send a REST PUT request to add new branch protection to that repo

## Things to improve
- To apply automatic branch protection for private repos we need to upgrade to Github pro.
- Better error handling for applying branch protection and creating issues
- Add tests for the functions in github.js
- Validate input data coming from the webhook