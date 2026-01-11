import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoriteAddressesService } from './favorite-addresses.service';
import { CreateFavoriteAddressDto } from './dto/create-favorite-address.dto';
import { UpdateFavoriteAddressDto } from './dto/update-favorite-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PassengerGuard } from '../auth/guards/passenger.guard';

@Controller('favorite-addresses')
@UseGuards(JwtAuthGuard, PassengerGuard)
export class FavoriteAddressesController {
  constructor(private readonly service: FavoriteAddressesService) {}

  @Post()
  create(@Body() data: CreateFavoriteAddressDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('passenger/:passengerId')
  findByPassengerId(@Param('passengerId') passengerId: string) {
    return this.service.findByPassengerId(passengerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateFavoriteAddressDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
