import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const addNewBookSchema = Joi.object({
  title: Joi.string().required(),
});

const addNewBookValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = addNewBookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

export { addNewBookValidator };
