# FUNCTIONS

This directory contains our Firebase Cloud Functions.

More information about the usage of this directory in the documentation:
https://firebase.google.com/docs/functions/

#### Configuration keys

To use MailerLite, SparkPost, and stripe we need to configure enviroment keys using this command:

``` bash
$ firebase functions:config:set mailerlite.key="THE KEY"
$ firebase functions:config:set sparkpost.key="THE KEY"
$ firebase functions:config:set stripe.token="THE KEY"
```
To list the current config:

``` bash
$ firebase functions:config:get
```

To run and test functions locally, you need to add configurations key into a file:
``` bash
firebase functions:config:get > .runtimeconfig.json
```