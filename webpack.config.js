const path = require('path');


module.exports = {
  entry: ['./src/index.js'],
  output: {
    //path: __dirname,
    //publicPath: '/',
    //filename: 'bundle.js',


	// options related to how webpack emits results

    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "bundle.js", // string
    //filename: "[name].js", // for multiple entry points
    //filename: "[chunkhash].js", // for long term caching
    // the filename template for entry chunks

    publicPath: "/", // string
    //publicPath: "",
    //publicPath: "https://cdn.example.com/",
    // the url to the output directory resolved relative to the HTML page

  },
  module: {
    rules: [
      {
        use: [
			
			{
				loader: 'babel-loader',
					options: {
					presets: ['react', 'es2015', 'stage-1']
				}
			}

        ]
      }
    ]
	/*,
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
	]*/
  	},
  	resolve: {
    	modules: [
      "node_modules",
      path.resolve(__dirname)
    ],
    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used
  	},
  	devServer: {
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		contentBase: './'	
	}
};
