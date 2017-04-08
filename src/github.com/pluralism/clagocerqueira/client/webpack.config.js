const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


function join(dest) {
  return path.resolve(__dirname, dest);
}


function web(dest) {
  return join('app/' + dest);
}


function extractImages(folder) {
  let result = [];
  let dirFiles = fs.readdirSync(web(folder));

  for(let i = 0; i < dirFiles.length; i++) {
    let from = path.join(web(folder), dirFiles[i]);
    let statRes = fs.statSync(from);
    if(statRes.isFile()) {
      result.push(from);
    }
  }

  return result.length === 0 ? ["error"] : result;
}


const extractText = new ExtractTextPlugin({
  filename: "[name].css"
});



module.exports = {
  entry: {
    application: [
      web('static/bootstrap/css/bootstrap.min.css'),
      web('static/font-awesome/css/font-awesome.min.css'),
      web('static/cube-portfolio/cubeportfolio/css/cubeportfolio.min.css'),
      web('static/cube-portfolio/cubeportfolio/custom/custom-cubeportfolio.css'),
      web('static/owl-carousel2/assets/owl.carousel.css'),
      web('static/line-icons/line-icons.css'),
      web('static/theme/app.css'),
      web('static/theme/style-one.css'),
      web('static/theme/style.scss'),
      web('static/theme/globals.css'),
      web('static/messenger/messenger.css'),
      web('static/messenger/messenger-spinner.css'),
      web('static/messenger/messenger-theme-flat.css'),


      web('static/bootstrap/js/bootstrap.min.js'),
      web('static/backstretch/jquery.backstretch.min.js'),
      web('static/smoothScroll/smoothScroll.js'),
      web('static/cube-portfolio/cubeportfolio/js/jquery.cubeportfolio.min.js'),
      web('static/owl-carousel2/owl.carousel.min.js'),
      web('static/messenger/messenger.min.js'),
      web('static/messenger/messenger-theme-flat.js'),
      web('application.js')
    ],

    images: [].concat.apply([], [extractImages('static/img/site/presidents/1976_2013/'),
            extractImages('static/img/site/'),
            extractImages('static/img/site/authors/'),
            extractImages('static/img/site/personalities/'),
            extractImages('static/img/site/associations/civic/'),
            extractImages('static/img/site/associations/cultural/'),
            extractImages('static/img/site/associations/sports/'),
            extractImages('static/img/site/associations/social/'),
            extractImages('static/img/site/press/')])
  },


  output: {
    path: join('../server/static/prod'),
    filename: "[name].js",
    publicPath: '/public/prod/'
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: false,
          presets: ['env',
          'react',
          'stage-0']
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
        loaders: ['file-loader?name=images/[name].[ext]', {
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
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    extractText
  ]
};
