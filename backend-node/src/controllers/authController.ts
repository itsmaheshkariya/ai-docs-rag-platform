import { Request, Response, NextFunction } from 'express';
import { registerUserService, loginUserService } from '@/services/userService';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { user, token } = await registerUserService(email, password);
    res.status(200).json({ id: user.id, email: user.email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const token = await loginUserService(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
