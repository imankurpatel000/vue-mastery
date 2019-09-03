# Vue Mastery

> The ultimate learning resource for Vue developers

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Getting Started

### Prerequisites

- [Node.js v9.0+](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com) - Optional, but recommended
- `firebase.js` - Request from active developer
- `serviceAccountKey.json` - Request from active developer

### Instructions

1. Clone repo
1. Place `firebase.js` in project root directory
1. Place `serviceAccountKey.json` in project root directory
1. Open project in terminal
1. Run the following commands

```bash
# install dependencies
$ yarn # or npm install
# start local dev server
$ yarn dev # or npm run dev
```

You should now have a local server running with hot reloading at http://localhost:3000! 🎉

## Deployment

### Prerequisites

- Install [Firebase CLI](https://github.com/firebase/firebase-tools) globally
- Access to Firebase project with a Google account

### Instructions

1. Tell firebase to use the default environment

```bash
firebase use default
```

2. Initiate a connection to firebase

```bash
firebase login
```

3. Deploy application

```bash
npm run deploy
```

### Firebase Setup

Because we don't want to share Firebase credential we need to create a `firebase.js` file in the root of the project. It will look something like this:

```js
module.exports = {
  apiKey: 'info-from-firebase-web-instructions',
  authDomain: 'info-from-firebase-web-instructions',
  databaseURL: 'info-from-firebase-web-instructions',
  projectId: 'info-from-firebase-web-instructions',
  storageBucket: 'info-from-firebase-web-instructions',
  messagingSenderId: 'info-from-firebase-web-instructions'
}
```

#### Configuration keys

To use MailerLite, SparkPost, and stripe we need to configure environment keys using this command:

```bash
$ firebase functions:config:set mailerlite.key="THE KEY"
$ firebase functions:config:set sparkpost.key="THE KEY"
$ firebase functions:config:set stripe.token="THE KEY"
```

To list the current config:

```bash
$ firebase functions:config:get
```

#### Rules

In order to keep other users from writing to paths they don't own, we need to add some rules to the database:

```json
{
  "rules": {
    "accounts": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### Social Logins

We will setup social login for Google and Github. We will need to login to your Firebase console and enable those signin methods. Google will work out-of-the-box with any Firebase app. But we will need to create a new oAuth application if we would like to use Github signin.

## Test

We use Cypress to test

```bash
$(npm bin)/cypress open
```

## Usage

### Production

This is just in case we want to deploy on different server then firebase hosting

```bash
# build for production and launch the server
$ npm run build
$ npm start
```

### Generate

```bash
# generate a static project
$ npm run generate
```

You should probably generate the static project before you deploy as the deployment take every static output from nuxt to the dist folder, which is then copy over to firebase host folder.

The functions folder is also copy over and help us to respond to specific backend tasks.

```bash
# deploy the complete solution:
$ firebase deploy
# deploy only the functions:
$ firebase deploy --only functions
# deploy only the generated static pages:
$ firebase deploy --only hosting
# Shortcut that you should use all of the time for deployment:
$ npm run deploy
```

### Staging vs production

You can deploy on staging or in production with this command:

```bash
# deploy solution in production
$ firebase use default
# deploy solution on staging
$ firebase use staging
```

You can control which database you want to use using the firebase.js file (this file is private and not in github)
firebase.js file you should update the env variable to 'staging' or 'production'.

All the paths to images and data are connected according to this settings.
So you can deploy staging env using production database if you want.
