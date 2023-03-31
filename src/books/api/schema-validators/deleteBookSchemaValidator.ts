import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const deleteBookSchema = Joi.object({
  id: Joi.string().required(),
});

const deleteBookValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteBookSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

export { deleteBookValidator };
