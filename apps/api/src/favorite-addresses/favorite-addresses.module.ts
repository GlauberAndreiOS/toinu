import { Module } from '@nestjs/common';
import { FavoriteAddressesController } from './favorite-addresses.controller';
import { FavoriteAddressesService } from './favorite-addresses.service';
import { FavoriteAddressesRepository } from './favorite-addresses.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavoriteAddressesController],
  providers: [FavoriteAddressesService, FavoriteAddressesRepository],
  exports: [FavoriteAddressesService],
})
export class FavoriteAddressesModule {}
