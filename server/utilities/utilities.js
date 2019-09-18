module.exports.flattenObject = function flattenObject(object, title = null) {
  let keys = Object.keys(object);
  let jsonObj = {};

  for (key of keys) {
    if (typeof object[key] === "object") {
      let tempObj = flattenObject(object[key], key);
      jsonObj = { ...jsonObj, ...tempObj };
    } else {
      if (title === null) {
        jsonObj[key] = object[key];
      } else {
        jsonObj[title + `.${key}`] = object[key];
      }
    }
  }

  return jsonObj;
};
