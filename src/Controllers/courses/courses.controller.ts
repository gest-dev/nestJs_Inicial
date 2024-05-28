import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../../Guards/permission.guard';
import { CheckTokenGuard } from '../../Guards/check-token.guard';
import { RateLimitGuard } from '@/guards/rate-limit.guard';

@Controller('courses')
export class CoursesController {
  @Get()
  @UseGuards(
    new RateLimitGuard(5),
    CheckTokenGuard,
    new PermissionGuard(['admin_edit-user_edit']),
  )
  findAll() {
    return {
      courses: [
        {
          id: 1,
          name: 'First course',
        },
      ],
    };
  }
}
