import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User, PassengerStatus } from '@toinu/shared-types';

@Injectable()
export class PassengerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || !user.passenger) {
      throw new ForbiddenException('Acesso restrito a passageiros.');
    }

    if (user.passenger.status !== PassengerStatus.VERIFIED) {
      throw new ForbiddenException('Sua conta de passageiro ainda não foi verificada.');
    }

    return true;
  }
}
