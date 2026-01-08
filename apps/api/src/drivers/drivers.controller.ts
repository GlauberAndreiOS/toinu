import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Driver } from '@toinu/shared-types';
import { DriversService } from './drivers.service';
import { DriversResource } from './drivers.resource';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('drivers')
@UseGuards(JwtAuthGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async findAll(): Promise<Driver[]> {
    return DriversResource.formatMany(await this.driversService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Driver | null> {
    return DriversResource.format(await this.driversService.findOne(id));
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<boolean> {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.driversService.delete(id);
  }
}
