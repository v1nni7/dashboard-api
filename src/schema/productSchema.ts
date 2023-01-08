import Joi, { ObjectSchema } from "joi";

const createProductSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  brand: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().required(),
  code: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().required(),
  stock: Joi.number().required(),
});

export { createProductSchema };
