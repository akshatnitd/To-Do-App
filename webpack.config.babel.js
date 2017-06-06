import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/img-[hash:6].[ext]"}
      ]
  },

  node: {
    fs: "empty"
  },

  plugins: [
  	HTMLWebpackPluginConfig,
  	new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
	    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),//minify everything

    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
	],

    devServer: {
    inline: true,
    contentBase: './',
    port: 8080
  }
};
