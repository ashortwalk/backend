// src/chat/services/message.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageModel } from '../schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageModel.name)
    private readonly messageModel: Model<Message>,
  ) {}

  // 메시지 저장
  async saveMessage(
    userId: string,
    room: string,
    content: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      userId,
      room,
      content,
    });
    return await newMessage.save();
  }

  // 특정 방의 메시지 조회
  async getMessagesByRoom(room: string): Promise<Message[]> {
    return this.messageModel.find({ room }).sort({ createdAt: 1 }).exec();
  }
}
