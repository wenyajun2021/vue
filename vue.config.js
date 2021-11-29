module.exports = {
    publicPath: '/wen',
    outputDir: 'assets',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    // 补全css前缀(解决兼容性)
                    require('autoprefixer')(),
                    // 把px单位换算成rem单位
                    require('postcss-pxtorem')({
                        rootValue: 37.5, // 换算的基数37.5
                        //  selectorBlackList: [".my-van", 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // 要忽略的选择器并保留为px。
                        propList: ['*'], //可以从px更改为rem的属性。
                        minPixelValue: 2, // 设置要替换的最小像素值。
                    }),
                ],
            },
        },
    },
    configureWebpack: config => {
        config.optimization = {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 300000, // 依赖包超过300000bit将被单独打包
                automaticNameDelimiter: '-',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `chunk.${packageName.replace('@', '')}`;
                        },
                        priority: 10,
                    },
                },
            },
        };
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
};
