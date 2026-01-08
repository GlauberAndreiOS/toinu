import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Passenger } from '@toinu/shared-types';
import { PassengersService } from './passengers.service';
import { PassengersResource } from './passengers.resource';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('passengers')
@UseGuards(JwtAuthGuard)
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Get()
  async findAll(): Promise<Passenger[]> {
    return PassengersResource.formatMany(
      await this.passengersService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Passenger | null> {
    return PassengersResource.format(await this.passengersService.findOne(id));
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<boolean> {
    return this.passengersService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.passengersService.delete(id);
  }
}
