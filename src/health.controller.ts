import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class HealthController {
  constructor() {}

  @Get()
  healthCheck(@Res() res) {
    return res.status(200).send('Hello Short Walk!');
  }
}
