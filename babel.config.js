
// const { genkit } = require("genkit");
// const { googleAI, gemini } = require("@genkit-ai/googleai");

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       [
//         'module-resolver',
//         {
//           alias: {
//             genkit: 'genkit/lib',
//             '@genkit-ai/googleai': '@genkit-ai/googleai/lib',
//           },
//         },
//       ],
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
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

