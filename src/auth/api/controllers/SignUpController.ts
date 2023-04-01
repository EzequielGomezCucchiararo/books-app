import { Request, Response } from 'express';
import { SignUp } from '../../application';
import { UserAlreadySignedUpError } from '../../domain/errors';

export class SignUpController {
  private readonly _signUp: SignUp;

  constructor(signUp: SignUp) {
    this._signUp = signUp;
  }

  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      await this._signUp.execute(email, password);

      res.status(201).json({ success: true });
    } catch (error: any) {
      if (error instanceof UserAlreadySignedUpError) {
        res.status(409).json({ error: error.message });
      }

      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
