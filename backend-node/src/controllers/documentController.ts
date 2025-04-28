import { NextFunction, Request, Response } from 'express';
import { Document } from '@/models/Document';

import { uploadDocument, listDocuments } from '@/services/documentService';

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

export const deleteDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const doc = await Document.findByPk(id);

    if (!doc) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    await doc.destroy();
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const doc = await Document.findByPk(id);
    if (!doc) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    doc.title = title || doc.title;
    doc.status = status || doc.status;
    await doc.save();

    res.status(200).json({ message: 'Document updated successfully', doc });
  } catch (error) {
    next(error);
  }
};
