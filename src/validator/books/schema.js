const joi = require('joi');

const BookPayloadSchema = joi.object({
  name: joi.string().required(),
  year: joi.number().integer().min(1900).max(2023),
  author: joi.string().required(),
  summary: joi.string().required(),
  publisher: joi.string().required(),
  pageCount: joi.number().integer().min(0).max(10000),
  readPage: joi.number().integer().min(0).max(10000),
  reading: joi.boolean().required(),
});

module.exports = { BookPayloadSchema };