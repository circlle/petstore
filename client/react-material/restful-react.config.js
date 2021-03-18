// import --url http://localhost:4000/api-json --output src/generated-types.tsx
module.exports = {
  petstore: {
    output: "src/generated-types.tsx",
    url: "http://localhost:4000/api-json",
    skipReact: true,
  },
};
