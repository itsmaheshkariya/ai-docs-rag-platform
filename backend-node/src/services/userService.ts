import { User } from '@/models/User';
import { hashPassword, comparePassword } from '@/utils/hash';
import { generateToken } from '@/utils/token';

export const registerUserService = async (email: string, password: string) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already exists');

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash }); // ⬅️ only these fields

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
};


export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  
  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  
  const token = generateToken({ id: user.id, role: user.role });

  return token;
};
