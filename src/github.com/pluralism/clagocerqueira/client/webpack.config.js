let path = require('path');
let webpack = require('webpack');


function join(dest) {
  return path.resolve(__dirname, dest);
}


function web(dest) {
  return join('app/' + dest);
}


module.exports = {
  entry: {
    application: [
      web('application.js')
    ]
  },

  output: {
    path: join('app/static/prod'),
    filename: 'application.js',
    publicPath: ''
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['env', 'react']
        }
      }
    ]
  },


  plugins: [
    /**
     * Automatically loaded modules
     * A module is loaded when the identifier($ for jQuery) is used as a free variable in
     * a module. The identifier is filled with the exports of the loaded module
    */
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
