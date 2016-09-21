module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/fsg',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: '2061857327380122',
    clientSecret: 'a165df20411700863babc9238a7a1d28',
    callbackURL: 'http://localhost:1337/auth/facebook/callback'
  },
  GOOGLE: {
    clientID: '157089218140-0kbmedecqavrdmsfotu0fe5iamhojqpa.apps.googleusercontent.com',
    clientSecret: '5HzcU6FokkkezhMWHrvo_4bL',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  },
  LOGGING: false,
  NATIVE: true
}
