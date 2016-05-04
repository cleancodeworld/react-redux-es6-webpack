require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
    mainDomain: 'local.com',
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net',
  },
  production: {
    isProduction: true,
    mainDomain: 'knexpert.quotient.net',
    apiUrl: process.env.APIURL || 'http://api-knexpert.quotient.net',
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
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
