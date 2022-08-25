import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployerModule } from './employer/employer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EmployeeModule,
    EmployerModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://instrabajo:jmRZ9qq2Q019smS2@instrabajo.fxm5kak.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
