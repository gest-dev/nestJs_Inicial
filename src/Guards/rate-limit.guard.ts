import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private limiter;

  constructor(limit: number, windowMs: number = 30000) {
    this.limiter = rateLimit({
      windowMs, // Tempo de bloqueio personalizado em milissegundos (padrão 30 segundos)
      max: limit, // Máximo de solicitações personalizado por IP
      handler: (req, res, next) => {
        next(
          new HttpException(
            'Limite de taxa excedido. Tente novamente mais tarde.',
            HttpStatus.TOO_MANY_REQUESTS,
          ),
        );
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return new Promise((resolve, reject) => {
      this.limiter(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}
