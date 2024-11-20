import { Controller, Get } from '@nestjs/common';

@Controller('api/key')
export class KeyController {
  constructor() {}

  @Get('gpt')
  async gptKey() {
    return { gptKey: process.env.GPT_API_KEY };
  }
}
