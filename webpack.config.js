const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: [
		   './js/main.js',
		   './css/main.scss'
		]
	},
	output: {
		path: path.resolve(__dirname, './'),
		filename: './css/main.css',
		filename: './js/bundle.js'
	},
	module: {
		 rules: [
		   {
		   	  test:  /\.m?js$/,
		   	  exclude: /(node_modules)/,
		   	  use: {
		   	  	 loader: 'babel-loader',
		   	  	 options: {
		   	  	 	presets: [
		   	  	 	'@babel/preset-env'
		   	  	 	]
		   	  	 }
		   	  }
		   },
		   {
		   	  test: /\.scss$/,
		   	  exclude: /node_modules/,
		   	  use: ExtractTextPlugin.extract({
		   	  	 fallback: 'style-loader',
		   	  	 use: ['css-loader?url=false','sass-loader']
		   	  })
		   },
		   {
		   	  test: /\.css$/,
		   	  exclude: /node_modules/,
		   	  use: ExtractTextPlugin.extract({
		   	  	 fallback: 'style-loader',
		   	  	 use: [
		   	  	    { loader: 'css-loader', options: { minimize: false } }
		   	  	 ]
		   	  })
		   },
		   {
		   	  test: /\.(png|jpg|gif)$/,
		   	  exclude: /node_modules/,
		   	  use: {
		   	  	  loader: 'file-loader',
		   	  	  options: {
		   	  	  	name: '[path][name].[ext]'
		   	  	  }
		   	  }
		   },
		   {
		   	  test: /\.(html)$/,
		   	  use: {
		   	  	 loader: 'html-loader',
		   	  	 options: {
		   	  	 	minimize: false,
		   	  	 	outputPath: './public',
		   	  	 	attrs: [':data-src']
		   	  	 }
		   	  }
		   },
		   {
		   	  test: /\.pug$/,
		   	  loader: 'pug-loader',
		   	  options: {
		   	  	 outputPath: './',
		   	  	 pretty: true
		   	  }
		   }
		
		]
	},
	plugins: [
	  new ExtractTextPlugin({
	  	  filename: './css/main.css'
	  }),
	  new HtmlWebpackPlugin({
	  	  filename: './index.html',
	  	  template: './index.pug',
	  	  inject: false
	  }),
	  new webpack.NamedModulesPlugin(),
	  new webpack.HotModuleReplacementPlugin()
	]
}