const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const minifyId = (value, helpers) => {
  if(!value.match(/\A[\-_0-9a-zA-Z]{3,40}\z/)){
    return helpers.message('"{{#label}}" must be a valid minify id');
  }
  return value;
}

module.exports = {
  objectId,
  minifyId
};
