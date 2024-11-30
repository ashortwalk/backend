import { Schema, Document } from 'mongoose';

export interface Message extends Document {
  userId: string;
  room: string;
  content: string;
  createdAt: Date;
}

export const MessageSchema = new Schema<Message>({
  userId: { type: String, required: true },
  room: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = {
  name: 'Message',
  schema: MessageSchema,
};
