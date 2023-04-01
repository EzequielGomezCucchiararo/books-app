import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const updateBookSchema = Joi.object({
  id: Joi.string().required(),
});

const updateBookValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = updateBookSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

export { updateBookValidator };
