const path = require('path');
const webpack = require('webpack');

module.exports = {
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
            name: 'typescript',
            options: {
                useBabel: true,
                useEslint: true,
                forkTsChecker: {
                    tsconfig: './tsconfig.json',
                    tslint: undefined,
                    watch: './src',
                    typeCheck: true,
                },
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
    modifyWebpackConfig: (config) => {
        const customConfig = { ...config.webpackConfig };
        customConfig.resolve['alias'] = {
            '@ui': path.resolve('./src/ui/'),
            '@core': path.resolve('./src/core/'),
            '@constants': path.resolve('./src/constants/'),
            '@pages': path.resolve('./src/pages/'),
            '@types': path.resolve('./src/types/'),
            '@features': path.resolve('./src/features/'),
            '@utils': path.resolve('./src/utils/'),
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
        };
        customConfig.plugins.push(
            new webpack.ProvidePlugin({
                h: ['preact', 'h'],
            }),
        );
        return customConfig;
    },
};
