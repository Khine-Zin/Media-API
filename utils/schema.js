const joi = require("joi");

module.exports = {
  AddCat: joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    user: joi.optional(),
  }),

  RegisterSchema: joi.object({
    name: joi.string().required(),
    email: joi
      .string()
      .email()
      .required(),
    phone: joi
      .string()
      .min(8)
      .max(11)
      .required(),
    passward: joi.string().required(),
  }),

  PostSchema: joi.object({
    category: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),

    image: joi.string().required(),
    title: joi.string().required(),
    tag: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    desc: joi.string().required(),
    user: joi.optional(),
  }),

  TagSchema: joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    user: joi.optional(),
  }),

  CommentSchema: joi.object({
    postId: joi.string().required(),
    name: joi.string().required(),
    email: joi
      .string()
      .email()
      .required(),
    content: joi.string().required(),
    user: joi.optional(),
  }),

  AllSchema: joi.object({
    id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};
