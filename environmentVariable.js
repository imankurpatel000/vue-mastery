if (process.env.projectId !== 'vue-mastery') require('dotenv').config()

module.exports = {
  'project_id': process.env.projectId,
  'private_key_id': process.env.privateKeyId,
  'private_key': process.env.privateKey.replace(/\\n/g, '\n'),
  'client_email': process.env.clientEmail,
  'client_id': process.env.clientId,
  'auth_uri': process.env.authUri,
  'token_uri': process.env.tokenUri,
  'auth_provider_x509_cert_url': process.env.authProviderX509CertUrl,
  'client_x509_cert_url': process.env.clientX509CertUrl,
  // Simple copy from firebase
  'env': process.env.env,
  'apiKey': process.env.apiKey,
  'authDomain': process.env.authDomain,
  'databaseURL': process.env.databaseURL,
  'projectId': process.env.projectId,
  'storageBucket': process.env.storageBucket,
  'messagingSenderId': process.env.messagingSenderId,
  'baseUrl': process.env.baseUrl,
  'cloudfunctions': process.env.cloudfunctions,
  'chargebeeSite': process.env.chargebeeSite,
  'chargebeeKey': process.env.chargebeeKey,
  'algoliaAppId': process.env.algoliaAppId,
  'algoliaApiKey': process.env.algoliaApiKey
}
