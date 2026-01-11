import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DriversModule } from '../drivers/drivers.module';
import { PassengersModule } from '../passengers/passengers.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FavoriteAddressesModule } from '../favorite-addresses/favorite-addresses.module';
import { TripsModule } from '../trips/trips.module';
import { CpfVerificationModule } from '../cpf-verification/cpf-verification.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    DriversModule,
    PassengersModule,
    VehiclesModule,
    FavoriteAddressesModule,
    TripsModule,
    CpfVerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
