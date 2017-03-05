let path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


function join(dest) {
  return path.resolve(__dirname, dest);
}


function web(dest) {
  return join('app/' + dest);
}


const extractText = new ExtractTextPlugin({
  filename: "[name].css"
});


module.exports = {
  entry: {
    application: [
      web('application.js'),
      web('static/theme/app.css'),
      web('static/theme/style-one.css'),
      web('static/font-awesome/css/font-awesome.min.css'),
      //web('static/cube-portfolio/cubeportfolio/css/cubeportfolio.min.css'),
      //web('static/cube-portfolio/cubeportfolio/custom/custom-cubeportfolio.css'),
      //web('static/owl-carousel2/assets/owl.carousel.css'),
      //web('static/line-icons/line-icons.css'),
      web('static/theme/style.scss'),
      web('static/theme/globals.css'),
    ]
  },

  output: {
    path: join('app/static/prod'),
    filename: "[name].js"
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractText.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractText.extract({
          use: [{
            loader: "css-loader"
          }]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        loaders: ['file-loader?hash=sha512&digest=hex&name=images/[name]_[hash].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader?hash=sha512&digest=hex&name=fonts/[name]_[hash].[ext]'
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
    }),
    extractText
  ]
};
