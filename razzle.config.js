const webpack = require('webpack');

module.exports = {
    options: {
        buildType: 'spa',
        verbose: true,
    },
    modifyWebpackConfig({
        webpackConfig, // the created webpack config
    }) {
        const customConfig = { ...webpackConfig };
        customConfig.plugins.push(
            new webpack.ProvidePlugin({
                h: ['preact', 'h'],
            }),
        );
        customConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat', // Must be below test-utils
            'react/jsx-runtime': 'preact/jsx-runtime',
        };
        return customConfig;
    },
    plugins: [
        {
            name: 'bundle-analyzer',
            options: {
                target: 'web',
                env: 'production',
                bundleAnalyzerConfig: {},
            },
        },
        {
            name: 'scss',
            options: {
                postcss: {
                    dev: {
                        sourceMap: false,
                    },
                },
            },
        },
        'eslint',
    ],
};
