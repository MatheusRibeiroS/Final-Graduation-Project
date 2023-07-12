import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { DriveModule } from './drive/drive.module';

@Module({
  imports: [AuthModule, ItemsModule, UsersModule, DriveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
