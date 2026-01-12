import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteAddressesService } from './favorite-addresses.service';
import { CreateFavoriteAddressDto } from './dto/create-favorite-address.dto';
import { UpdateFavoriteAddressDto } from './dto/update-favorite-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorite-addresses')
@UseGuards(JwtAuthGuard)
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
  async findOne(@Param('id') id: string) {
    const address = await this.service.findOne(id);
    if (!address) throw new NotFoundException('Endereço não encontrado');
    return address;
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateFavoriteAddressDto) {
    const updated = await this.service.update(id, data);
    if (!updated) throw new NotFoundException('Endereço não encontrado para atualizar');
    return true;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException('Endereço não encontrado para remover');
    return true;
  }
}
