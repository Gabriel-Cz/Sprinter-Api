import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query'
        },
        {
          emit: 'event',
          level: 'info'
        },
        {
          emit: 'event',
          level: 'warn'
        },
        {
          emit: 'event',
          level: 'error'
        },
      ]
    });
  }

  async onModuleInit() {
    await this.$connect();
    if (process.env.DEVELOPMENT) {
      this.$on('info', (event: any) => {
        console.log(`${event.info}`);
      });
      this.$on('warn', (event: any) => {
        console.log(`${event.warn}`);
      });
      this.$on('error', (event: any) => {
        console.log(`${event.error}`);
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
