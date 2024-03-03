const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

// console.log(defaultConfig);
// process.exit(0);

module.exports = {
    ...defaultConfig,
    externals: {
      '@rjsf/core': [ 'window rjsf', 'core' ],
      '@rjsf/utils': [ 'window rjsf', 'utils' ],
      '@rjsf/validator-ajv8': [ 'window rjsf', 'validator-ajv8' ],
      '@rjsf/renderer': [ 'window rjsf', 'renderer' ]
    }
    /*
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /.toml/,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
        ],
    },
    */
};
