import { Module } from '@nestjs/common';
import { CoursesController } from './Controllers/courses/courses.controller';
import { AuthController } from './Controllers/auth/auth.controller';

@Module({
  imports: [],
  controllers: [CoursesController, AuthController],
  providers: [],
})
export class AppModule { }
