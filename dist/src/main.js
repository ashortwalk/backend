"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8000',
        ],
        credentials: true,
        exposedHeaders: ['Authorization', 'appKey'],
    });
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map