module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/fsg',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
    clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
  },
  GOOGLE: {
    clientID: '1038638932084-va5asmkfcef0c6bj90eaho9na2bt296i.apps.googleusercontent.com',
    clientSecret: '2f5yDGqfRkYn5oIkWieqrr3Z',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  },
  LOGGING: false,
  NATIVE: true
}
