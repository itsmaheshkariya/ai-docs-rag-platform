import axios from 'axios';
import FormData from 'form-data';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const askQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { question } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path));
    formData.append('question', question);

    const response = await axios.post('http://localhost:8000/v1/ask-question', formData, {
      headers: formData.getHeaders(),
    });

    res.status(200).json(response.data);
    return;
  } catch (error) {
    next(error);
  }
};
