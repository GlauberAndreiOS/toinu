import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Vehicle } from '@toinu/shared-types';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverGuard } from '../auth/guards/driver.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesResource } from './vehicles.resource';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, DriverGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return VehiclesResource.formatMany(await this.vehiclesService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle | null> {
    return VehiclesResource.format(await this.vehiclesService.findOne(id));
  }

  @Get('driver/:driverId')
  async findByDriverId(
    @Param('driverId') driverId: string,
  ): Promise<Vehicle[]> {
    return VehiclesResource.formatMany(
      await this.vehiclesService.findByDriverId(driverId),
    );
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return VehiclesResource.format(
      await this.vehiclesService.create(createVehicleDto),
    );
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<boolean> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.vehiclesService.delete(id);
  }
}
