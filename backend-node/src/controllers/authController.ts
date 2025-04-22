import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.json({ id: user.id, email: user.email });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
