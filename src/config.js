require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net'
  },
  production: {
    isProduction: true,
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  mainDomain: 'knexpert.quotient.net',
  host: process.env.HOST || 'localhost',
  port: 3000, // port fixed for easier auto deploy, changed from: process.env.PORT,
  app: {
    title: 'KNExpert',
    description: 'KNExpert',
    head: {
      titleTemplate: 'KNExpert',
      meta: [
        {name: 'description', content: 'KNExpert.'}
      ]
    }
  },

}, environment);
