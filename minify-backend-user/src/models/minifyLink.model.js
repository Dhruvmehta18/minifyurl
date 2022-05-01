const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// noinspection JSValidateTypes
const linkSchema = mongoose.Schema({
  minifyId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  originalLink: {
    type: String,
    trim: true,
    required: true,
  },
  expirationTime: {
    type: Date,
    trim: true,
    required: true,
  },
  creationTime: {
    type: Date,
    trim: true,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

// add plugin that converts mongoose to json
linkSchema.plugin(toJSON);
linkSchema.plugin(paginate);

/**
 * Check if the minifyId is taken
 * @param {string} minifyId - The the short url id
 * @returns {Promise<boolean>}
 */
linkSchema.statics.isMinifyIdTaken = async function (minifyId) {
  const link = await this.findOne({ minifyId });
  return !!link;
};

linkSchema.statics.getLink = async function (minifyId, userId) {
  const link = await this.findOne({ minifyId, userId });
  return link
};

/**
 * @typedef Link
 */
const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
