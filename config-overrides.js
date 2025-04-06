const { override } = require('customize-cra');
const JavaScriptObfuscator = require('webpack-obfuscator');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = override(
  (config, env) => {
    const minify = process.env.REACT_APP_MINIFY === 'true';
    const obfuscate = process.env.REACT_APP_OBFUSCATE === 'true';

    if (env === "production") {
      config.optimization.minimizer = []
    }

        // Add polyfills for Node.js modules
        config.resolve = {
          ...config.resolve,
          fallback: {
            ...config.resolve?.fallback,
            buffer: require.resolve('buffer/'),
          },
        };
    
        // Add the ProvidePlugin for buffer
        config.plugins = (config.plugins || []).concat([
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        ]);
    
    // Setup minification
    if (minify) {
      config.optimization = config.optimization || {};
      config.optimization.minimizer = [
       /*  new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: process.env.REACT_APP_OBFUSCATE !== 'true',
          uglifyOptions: {
            compress: {
              drop_console: process.env.REACT_APP_DROP_CONSOLE === 'true',
              reduce_vars: true,
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_debugger: true
            },
            output: {
              comments: false,
            },
            mangle: true,
          },
        }), */
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: process.env.REACT_APP_DROP_CONSOLE === 'true',
              reduce_vars: true,
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_debugger: true,
            },
            format: {
              comments: false,
            },
            mangle: true, // Enable mangling
          },
          parallel: true,
        }),
      ];
    }

    // Setup obfuscation
    if (obfuscate) {
      config.plugins.push(
        new JavaScriptObfuscator({
          rotateUnicodeArray: true,
          disableConsoleOutput: process.env.REACT_APP_DROP_CONSOLE === 'true',
        }, [])
      );
    }

    if (minify && obfuscate) {
      config.devtool = false;
    } else {
      config.devtool = 'source-map'
    }
    return config;
  }
);
