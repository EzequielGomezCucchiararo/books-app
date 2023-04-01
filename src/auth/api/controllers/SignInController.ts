import { Request, Response } from 'express';
import { InvalidCredentialsError } from '../../domain/errors';
import { SignIn } from '../../application';

export class SignInController {
  private readonly _signIn: SignIn;

  constructor(signIn: SignIn) {
    this._signIn = signIn;
  }

  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      await this._signIn.execute(email, password);

      res.status(201).json({ success: true });
    } catch (error: any) {
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: error.message });
      }

      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
