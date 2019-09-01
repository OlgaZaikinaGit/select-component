var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["./index.js"],
	//mode: 'production',development
	mode: 'production',
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname,'dist')
	},
	resolve: {
		alias: {
		   'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
		  {
			test: /\.vue$/,
			loader: 'vue-loader'
		  },
		  {
			test: /\.js$/,
			loader: 'babel-loader'
		  },
		  {
			  test: /\.styl(us)?$/,
			  use: [
				'vue-style-loader',
				'css-loader',
				'stylus-loader'
			  ]
		  },
		  {
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader'],
		  },
		  {
			test: /\.pug$/,
			loader: 'pug-plain-loader'
		  }
		]
	 },
	  plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
		  filename: 'style.bundle.css',
		})
	 ]
};