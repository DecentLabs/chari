const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: path.resolve('../client/build/widget'),
		publicPath: "/widget/"
	},
	plugins: [
     	new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.ejs'
			}),
			new StatsPlugin('stats.json', {
				chunkModules: true,
				exclude: [/node_modules[\\\/]preact/]
			}),
			new MiniCssExtractPlugin()
    ],
	module: {
  		rules: [
    		{
    			test: /\.js$/,
    			exclude: /node_modules/,
    			loader: "babel-loader"
    		},{
				test: /\.scss$/,
				use: [
					{
						loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
  		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		publicPath :'/widget/'
	}
}
