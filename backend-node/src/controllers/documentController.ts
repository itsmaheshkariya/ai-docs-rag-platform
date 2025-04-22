import { Request, Response } from 'express';

import { uploadDocument, listDocuments } from '../services/documentService';

export const uploadDoc = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { title } = req.body;
  const doc = await uploadDocument(title, userId);
  res.status(200).json(doc);
};

export const getDocs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const docs = await listDocuments(userId);
  res.status(200).json(docs);
};
