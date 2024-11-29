import { Controller, Get } from '@nestjs/common';

@Controller('api/key')
export class KeyController {
  constructor() { }

  @Get()
  async gptKey() {
    return { gptKey: process.env.GPT_API_KEY, sttKey: process.env.STT_API_KEY };
  }
}
