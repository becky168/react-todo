// karma works well with webpack
var webpackConfig = require("./webpack.config.js");

module.exports = function (config) {
    config.set({ // set the configuration
        browsers: ["Chrome"], // set the browsers that we'll use karma
        singleRun: true, // 默认值：false ; 描述：CI模式。
                         // 如果设为true，karma会启动并捕获浏览器，运行测试然后退出，
                         // 至于exit code 是0还是1，就要看是否所有测试都通过还是有任何测试失败。
        frameworks: ["mocha"], // 描述：你要使用的测试框架列表，通常，你会设定为[’jasmine’], [’mocha’] 或 [’qunit’]
                              // 请注意：所有的框架都需要额外的插件/框架库 (通过npm安装)
        // 被加载到浏览器的 文件/模式 列表
        // 通常在 webpack.config.js 的 entry 裡設定的 file 也會在此設定
        files: [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/foundation-sites/dist/js/foundation.min.js",
            "app/tests/**/*.test.jsx" // ** : any files or directory
        ],
        preprocessors: { // 描述：用到的预处理器映射表
            "app/tests/**/*.test.jsx": ["webpack", "sourcemap"] // webpack: so we can load our components using "require"
                                                                // sourcemap: when we get error message in our tests, 
                                                                // we're not using bundle.js file, we'll use our actual .jsx file
        },
        reporters: ["mocha"], // reporters shows you which test is passed, and which is not passed.
                              // mocha => checkbox reporter
        client: { // client config sent in to the client
            mocha: { // send config into mocha
                timeout: "5000" // tell mocha that after 5000 milisecondes,
                                // if the test isn't finished,
                                // go ahead cancel it and set the test to failed
            }
        },
        webpack: webpackConfig, // use webpack information in webpack configuration
                                // in order to create tests that use require and let us load in in our module
        webpackServer: {
            noInfo: true //禁止webpack在预处理输出日志信息
        }
    });
};