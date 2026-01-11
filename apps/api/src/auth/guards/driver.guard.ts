import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from '@toinu/shared-types';

@Injectable()
export class DriverGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || !user.driver) {
      throw new ForbiddenException('Acesso restrito a motoristas.');
    }

    if (!user.driver.isApproved) {
      throw new ForbiddenException('Sua conta de motorista ainda não foi aprovada.');
    }

    return true;
  }
}
