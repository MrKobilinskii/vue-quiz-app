module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "plugin:prettier/recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": [2, "tab"],
    "no-tabs": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
