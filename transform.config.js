// const StyleDictionary = require('style-dictionary').extend('config.json');

// StyleDictionary.registerTransform({
//     name: "attribute/figma_cti",
//     type: "attribute",
//     matcher: (token) => true,
//     transformer: function (token) {
//       const attrNames = ["type", "item", "subitem", "state"];
//       const originalAttrs = token.attributes || {};
//       const generatedAttrs = {};

//       if (["borderRadius", "borderWidth", "spacing", "fontSizes", "dimension",].includes(token.original.type)) {
//         generatedAttrs["category"] = "size";
//       } else if ("typography" == token.original.type) {
//         generatedAttrs["category"] = "font";
//       } else if ("opacity" == token.original.type) {
//         generatedAttrs["category"] = "opacity";
//       } else if ("transparent" == token.original.type) {
//         generatedAttrs["category"] = "transparent";
//       } else {
//         generatedAttrs["category"] = token.original.type;
//       }

//       for (let i = 0; i < token.path.length && i < attrNames.length; i++) {
//         generatedAttrs[attrNames[i]] = token.path[i];
//       }
//       console.log(generatedAttrs);
//       return Object.assign(generatedAttrs, originalAttrs);
//     },
//   });
// // StyleDictionary.registerFormat({
// //     name: 'css/classFormat',
// //     formatter: function (dictionary, config) {
// //      const returnedValue = `
// //      ${dictionary.allProperties
// //      .map((prop) => {
// //       return `
// //      .${prop.name} {
// //      font-family: ${prop.value.fontFamily},
// //      font-size: ${prop.value.fontSize},
// //      font-weight: ${prop.value.fontWeight},
// //      line-height: ${prop.value.lineHeight}
// //        };`}).join('\n')}`;
// //        console.log(returnedValue);
// //       return JSON.stringify(returnedValue);
// //        },
// //      }
// //      )
//   StyleDictionary.buildAllPlatforms();

const StyleDictionary = require("style-dictionary").extend("config.json");

StyleDictionary.registerFilter({
  name: "filter-typography",
  matcher: ({ attributes }) => {
    return attributes.type === "typography";
  },
});

StyleDictionary.registerFilter({
    name: "box-shadow",
    matcher: ({ attributes }) => {
      return attributes.type === "dropShadow";
    },
  });

StyleDictionary.extend({
  source: ["tokens/tokens-output.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "colors.scss",
          format: "scss/variables",
          filter: {
            type: "color",
          },
        },
        {
            destination: "shadow.scss",
            format: "scss/variables",
            filter: "box-shadow",
          },
        {
          destination: "typography.scss",
          format: "scss/variables",
          filter: "filter-typography",
        },
      ],
    },

    Aviary: {
      transformGroup: "js",
      buildPath: "build/ts/",
      files: [
        {
          format: "javascript/es6",
          destination: "colors.ts",
          filter: {
            type: "color",
          },
        },
        {
          format: "javascript/es6",
          destination: "typography.ts",
          filter: "filter-typography",
        },
      ],
    },
  },
}).buildAllPlatforms();