// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
process.env.PHANTOMJS_BIN = 'node_modules/phantomjs/bin/phantomjs';
module.exports = function(config) {

  var configuration = {
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma'),
      require('karma-coverage')
    ],
    files: [{
      pattern: './src/test.ts',
      watched: false
    }],
    preprocessors: {
      './src/test.ts': ['angular-cli'],
      'dist/**/!(*spec).js': ['coverage']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    coverageReporter: {
      type: 'text-summary',
      // reporters: [{
      //   type: 'json',
      //   subdir: '.',
      //   file: 'coverage-final.json'
      // }]
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: ['progress', 'karma-remap-istanbul', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  }
  if (process.env.TRAVIS) {
    configuration.browsers = ['PhantomJS'];
  }
  config.set(configuration);
};
