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
      const { token } = await this._signUp.execute(email, password);

      return res.status(201).json({ success: true, token });
    } catch (error: any) {
      if (error instanceof UserAlreadySignedUpError) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
