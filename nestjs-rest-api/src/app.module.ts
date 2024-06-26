import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule, MyLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
