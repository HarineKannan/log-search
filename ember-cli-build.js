'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const proxyPath = '/LogFetcher'; 

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
 
  });

  // app.options['ember-cli-proxy'] = {
  //   proxyHost: 'http://localhost:8080',
  //   proxyPrefix: proxyPath,
  //   proxyReqHeaders: {
  //     'Access-Control-Allow-Origin': 'http://localhost:4200',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  //   }
  // };

  // app.options['ember-cli-proxy'] = {
  //   proxyHost: 'http://localhost:8080',
  //   proxyPrefix: proxyPath
  // };

  return app.toTree();
};
