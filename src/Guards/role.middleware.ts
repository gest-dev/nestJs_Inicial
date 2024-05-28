// import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

// @Injectable()
// export class RoleMiddleware implements NestMiddleware {
//   constructor(private roles: string[]) { }

//   use(req: Request, res: Response, next: Function) {
//     if (!req.user) {
//       throw new ForbiddenException('User does not exist!');
//     }

//     const userRoles = req.user.roles.map((role) => role.name);

//     const hasRole = this.roles.some((role) => userRoles.includes(role));

//     if (!hasRole) {
//       throw new ForbiddenException('Forbidden!');
//     }

//     next();
//   }
// }
