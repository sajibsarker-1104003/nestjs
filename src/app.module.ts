import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, PrismaModule, PostModule],
})
export class AppModule {}

