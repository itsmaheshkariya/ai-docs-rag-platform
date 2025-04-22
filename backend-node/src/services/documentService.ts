import { Document } from '../models/Document';

export const uploadDocument = async (title: string, ownerId: number) => {
  return Document.create({ title, ownerId });
};

export const listDocuments = async (ownerId: number) => {
  return Document.findAll({ where: { ownerId } });
};
