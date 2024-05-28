import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private permission: Array<string>) { }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    try {
      if (!this.permission) {
        return true; // Se nenhuma permissão específica é necessária, permite o acesso
      }

      if (!req.user) {
        throw new ForbiddenException('Forbidden!');
      }

      if (!(req.user?.roles && req.user?.roles.length > 0)) {
        throw new ForbiddenException('Forbidden!');
      }
      let permissionsExists = false;

      for (const key in req.user.roles) {
        const perExists = req.user.roles[key]?.permissions
          ? req.user.roles[key]?.permissions
              .map((perm) => perm?.name)
              .some((perm) => this.permission.includes(perm))
          : false;
        if (perExists) permissionsExists = true;
      }

      if (!permissionsExists) {
        throw new ForbiddenException('Forbidden!');
      }
      return true;
    } catch (error) {
      throw new ForbiddenException('Forbidden!');
    }
  }

}
