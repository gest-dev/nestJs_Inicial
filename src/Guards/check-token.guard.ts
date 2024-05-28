import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {

      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1];


      if (!token) {
        throw new UnauthorizedException('Token not provided!');
      }

      // exemplo Simule a extração de informações do usuário a partir do token
      const user = {
        id: 'user_id',
        name: 'user_name',
        roles: [
          {
            id: 1,
            name: 'administrator',
            label: 'Administrador do sistema',
            permissions: [
              {
                id: 1,
                name: 'admin_edit-user_edit',
                label: 'Editar usuario dentro do view',
              }
            ]
          }
        ]
      };

      // Passa o usuário para o próximo guard
      req.user = user;
      return true;

    } catch (error) {
      throw new UnauthorizedException('Token not provided!');
    }
  }
}
