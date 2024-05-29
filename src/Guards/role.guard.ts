import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private role: Array<string>) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    try {
      if (!this.role) {
        return true; // Se nenhuma permissão específica é necessária, permite o acesso
      }

      if (!req.user) {
        throw new ForbiddenException('Forbidden!');
      }

      if (!(req.user?.roles && req.user.roles?.length < 1)) {
        throw new ForbiddenException('Forbidden!');
      }

      const userRoles = req.user.roles.map((roleI: any) => roleI.name);

      const rolesExists = this.role.some((roleI: string) =>
        userRoles.includes(roleI),
      );

      if (!rolesExists) {
        throw new ForbiddenException('Forbidden!');
      }
      return true;
    } catch (error) {
      throw new ForbiddenException('Forbidden!');
    }
  }
}
