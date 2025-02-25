
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-react'],
    // plugins: [
    //   ['module-resolver', {
    //     alias: {
    //       // genkit: 'genkit/lib', '@genkit-ai/googleai': '@genkit-ai/googleai/lib', 
    //     },
    //   },
    //   ],
    // ],
  };
};