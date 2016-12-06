/* eslint no-console: 'off' */
'use strict';

/**
 * Dependencies
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const yaml = require('yamljs');
const readPackage = require('./read-package');
const config = require('../config');

/**
 * Configuration
 */
const ENV = config.ENV;
const PATH_CONFIG = config.PATH_CONFIG;

/**
 * Export merged configuration
 */
module.exports = function loadConfig() {

  //Build merged config object
  let configEnv = loadEnvConfig(ENV);
  let configLocal = loadEnvConfig('local');
  let configMerged = Object.assign({}, configEnv, configLocal, {ENV});

  //Parse package properties
  let pkg = readPackage();
  for (let key in configMerged) {
    if (configMerged.hasOwnProperty(key)) {
      configMerged[key] = parsePackageValues(pkg, configMerged[key]);
    }
  }

  //Return merged config
  return configMerged;
};

/**
 * Helper to parse package values
 */
function parsePackageValues(pkg, value) {
  if (typeof value === 'string') {
    value = value.replace(/\$\{pkg\.([a-zA-Z]+)\}/, function(matches, key) {
      if (typeof pkg[key] === 'undefined') {
        console.warn(chalk.yellow('Unknown package property %s'), key);
        return null;
      }
      return pkg[key];
    });
  }
  return value;
}

/**
 * Helper to load a config file and return parsed YAML object
 */
function loadEnvConfig(env) {
  try {
    let configPath = path.join(PATH_CONFIG, env + '.yml');
    let configYaml = fs.readFileSync(configPath).toString();
    return yaml.parse(configYaml);
  }
  catch (e) {
    if (env === 'development') {
      return loadEnvConfig('dev');
    }
    if (env === 'production') {
      return loadEnvConfig('prod');
    }
    if (env !== 'local') {
      console.warn(
        chalk.yellow('Could not load environment configuration file'),
        chalk.magenta(env + '.yml')
      );
    }
    return {};
  }
}
