var webpack = require("webpack");
var path = require("path"); // built in node.js, there's no need to install it.

/*
 * 通过NODE_ENV可以来设置环境变量（默认值为development）
 * 一般我们通过检查这个值来分别对开发环境和生产环境下做不同的处理
 * 
 * 在 webpack 中 run 的時候, 打下列指令:
 *   NODE_ENV = production webpack
 *   就可以用 production 的環境來編譯
 *   
 *   若加上 p flag, 會更加減少 file size:
 *   NODE_ENV = production webpack -p
 *   
 *   使用 p flag 可能會有很多 warning 在編譯的時候出現
 *   我們可以加上 plugin 來解決這個情況
 *   plugins: [
 *      new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
 *   ]
 *   
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    // entry: "./app/app.jsx", // tell webpack where to start our code
                               // by default, webpack 不認識 jsx, 所以要用 babel-loader
    entry: [
        // 程式一開始先load 下列的file (按照順序=>jquery=>foundation=>app.jsx)
        // .js => are regular script file, are not packaged for webpack
        //        so we need js-loader (script!) to handle them
        //        => script!+file path
        "script!jquery/dist/jquery.min.js",
        "script!foundation-sites/dist/js/foundation.min.js",
        "./app/app.jsx"
    ],
    externals: {
        /*
         * 如果你想使用某些全域變數，但你不想包含在Webpack的bundle.js之中，
         * 你在web.config.js中去啟用externals
         *
         * 如果你想将jquery分离，不打包到一起，可以使用externals。
         * 然后用<script>单独将jquery引入
         * 如果不介意将jquery打包到一起，请在alias中直接指向jquery的文件。
         * 可以提高webpack搜索的速度。准备部署上线时记得将换成jquery.min，能减少文件大小
         * key: module name
         * value: variable name we want to use in external script file
         *
         * 有时候我们希望某些模块走CDN并以<script>的形式挂载到页面上来加载，
         * 但又希望能在 webpack 的模块中使用上。
         * 这时候我们可以在配置文件里使用 externals 属性来帮忙
         */
        // require("jquery") 是引用自外部模块的
        // 对应全局变量 jQuery
        // 可以放心使用 var jQuery = require("jquery")
        jquery: "jQuery"
    },
    plugins: [
        /*
         * 顾名思义，就是配置要使用的插件。
         * plugin是比loader功能更强大的插件，能使用更多的wepack api。
         */
        // 如果你想將(jquery)模組使用在每一個模組中，
        // 像是讓$或jQuery都是使用在每一模組中，
        // 但不需要寫required('jquery')，
        // 你應該使用ProvidePlugin
        // key: variable name to watch for
        // value: the module we replaced with
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    output: {
        path: __dirname, // __dirname: the path to the current folder
        filename: "./public/bundle.js"
    },
    resolve: {
        // root必須是絕對路徑, 是通过绝对路径的方式来定义查找模块的文件夹
        // resolve.root only spcifies the resolving for modules
        root: __dirname,
        // 使用 moduleDirectories,
        // 只要有設定在該陣列裡的路徑, 就可以不用在 alias 中設定每個路徑
        // EX: 設定 app/components, 就不用在 alias 再去設定每個 components 路徑下的檔案
        modulesDirectories: [
            "node_modules", // provided by default
            "./app/components",
            "./app/api"
        ],
        alias: {
            app: "app",
            applicationStyles: "app/styles/app.scss",
            actions: "app/actions/actions.jsx",
            reducers: "app/reducers/reducers.jsx",
            configureStore: "app/store/configureStore.jsx"
        },
        // 如果希望在 require() 時不需要加入副檔名
        // 可以加入一個 resolve.extensions 屬性並告訴 webpack 哪些副檔名是可以省略的。
        // 設定後只需要寫 require('file') 而不用寫成 require('file.jsx')
        extensions: ["", ".js", ".jsx"] // 当requrie的模块找不到时，添加这些后缀 ("" or .js or .jsx)
    },
    module: {
        // loaders 指定要載入的loader，loaders 可以像 querystring 一樣接收參數。
        loaders: [
        /*
         * 配置要使用的loader。
         * 把资源文件（css、图片、html等非js模块）处理成相应的js模块,
         * 然后其它的plugins才能对这些资源进行下一步处理。
         * 比如babel-loader可以把es6的文件转换成es5。
         * 大部分的对文件的处理的功能都是通过loader实现的。
         * loader可以用来处理在入口文件中require的和其他方式引用进来的文件。
         * loader一般是一个独立的node模块，要单独安装。
         */
            {
                // tell babel-loader to take our file parse through react, 
                // get the output and run them through es2015
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"] // presets is built in to babel
                                                 // it knows what to do with this array
                },
                // 設定哪些檔案會被babel-loader parse through (就是 .js & .jsx 檔案)
                // use regular expression
                test: /\.jsx?$/,
                // 設定哪些資料夾不被 babel-loader parse
                // (node_modules & bower_components 資料夾)
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    sassLoader: {
        /*
         sassLoader: {
            includePaths: ['app']
            // 设置@import的搜索路径，如：@import ../app/a/b可以写成@import a/b
         }
        */
        includePaths: [
            /*
             * 路径寻航 path.resolve([from ...], to)
             * 特点：相当于不断的调用系统的cd命令
             * 示例：
                path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
             * 相当于：
                cd foo/bar 
                cd /tmp/file/ 
                cd .. 
                cd a/../subfile 
                pwd 
             *
             * "./node_modules/foundation-sites/scss" : the path we're looking for
            */
            path.resolve(__dirname, "./node_modules/foundation-sites/scss")
        ]
    },
    /*
     * This will auto create a source map that browser understand for us to debug
     * use source map, we will debug in the raw file(原始的file)
     * and run in the compiled file(bundle.js)
     */
    // devtool: "cheap-module-eval-source-map"
    /*
     * only enable in development envirment,
     * this will reduce our file size in production
     */
    devtool: process.env.NODE_ENV === "production" ? undefined : "cheap-module-eval-source-map"
};