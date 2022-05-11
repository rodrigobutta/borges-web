# Branches & Enviroments

For each distribution (country), we have 3 instances in our dev lifecycle: Master, Test and Stable.

### Master Branch

**uy-master**, **br-master**, **ar-master**
Will have the latest code and it's were all branches will be merged in first place after an internal test is made. And is the origin branch of any new feature.

### Test Branch

**uy-test**, **br-test**, **ar-test**
The code that was tested in master and needs to be tested by the users or another level of QA, will be merged in this branch. Where an AWS pipeline will grab the code changes and make a deployment to the correspondent server instance. Those changes should be applied after 30 minutes the PR has been merged down.

### Stable Branch

**uy-stable**, **br-stable**, **ar-stable**
Will have the changes that will be visible in the production enviroment. In order to merge any changes here, the developer needs to create a Pull Request (PR) that needs to be approved by a member of the team with stable privileges. After that, the process is the same as test, an AWS pipeline will grab the lates changes and make a deployment to production. Those changes should be applied after 30 minutes the PR has been merged down.

## Workflow

Any development (that is usually attached to an Jira ticket) needs to be developed in a new branch in which it's base branch will depend on the nature of the ticket and the distribution (country).

A) Eg, if the ticket requests a feature in te Uruguay site, the origin of that branch should be `uy-master` and the naming should have the ticket nature and code as a prefix, followed by a short descriptive name: `feature/URU123-change-button-color`

B) If we need to fix an error that is in the test enviroment of Uruguay (the user found a bug while testing an unreleased feature), the origin of the branch should be `uy-test` and the branch name should be something like `test-fix/BRA123-my-bad` and that branch will be merged down into `uy-test`

C) While if we need to fix a stable bug in Brazil, the origin of the branch should be `br-stable` and the branch name should be something like `stable-fix/BRA123-make-it-work-again` and that branch will be merged down into `br-stable` thru an approved Pull Request.

# Local Environment

## Setup and Install

All the environment dependent configuration is fetched from an .env file in the root of this project. So make a copy of the `/.env.default` file and name it `/.env`, and check or update the requested values

```
REACT_APP_BORGES_DEALERS_API_CONSUMER_ENDPOINT='http://localapi.aracargroup.com:8090'
```

In order to be able to access the API using cookies, you will need to access from a trusted origin (Eg. local.aracargroup.com. To do that you must create an entry on your local hosts file in order to enable that name to resolve to your local IP address.

You can find your host file location here:
https://en.wikipedia.org/wiki/Hosts_(file)

Example hosts (add this below the existing lines):

```
#BORGES DEALERS
127.0.0.1  local.aracargroup.com

#BORGES API
127.0.0.1  localapi.aracargroup.com
```

Install libraries

```
npm install
```

## Run

Run the app

```
npm run start
```

## Run in development mode

Run the app

```
npm run dev
```

5.1 in VSCODE launch "Start with Chrome"
5.2 on the auto opened Chrome window, go to http://local.aracargroup.com:3006/
5.3 that session will be atrached with the VSCODE debugger

# Test Environment

We are using AWS EC2 to host the API. So for being able to set changes in the enviroment, you'll need an IAM user that has access to the AWS account.

## Setup and Install

### Enviroment variables

All the enviroment dependent configuration is fetched from the enviroment with enviroment variables (same as local) but in this case, the enviroment variables are read from https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environments

# Troubleshoot

use node 14

You can instal nvm to easily switch node versions

```
nvm install 14
nvm use 14
```

Failed to compile.
./src/styles/index.scss (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/styles/index.scss)
Error: Missing binding /Users/rodrigobutta/arc/dealers/node_modules/node-sass/vendor/darwin-x64-83/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 14.x

> > > > npm rebuild node-sass

deploy
