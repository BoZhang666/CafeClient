import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';

export interface CreateCafeDto {
  name: string;
  description: string;
  location: string;
  id: string;
}

export interface CreateEmployeeDto {
  id: string;
  name: string;
  email_address: string;
  phone_number: number;
  gender: string;
  cafe: string;
  work_start_date: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cafes')
  getCafes(@Query('location') location: string) {
    return this.appService.getCafes(location);
  }

  @Post('cafe')
  createCafe(@Body() cafeParams: CreateCafeDto) {
    if (!cafeParams.name || !cafeParams.location || !cafeParams.description) {
      throw new BadRequestException('Missing params!');
    }
    return this.appService.createCafe(cafeParams);
  }

  @Put('cafe')
  updateCafe(@Body() cafeParams: CreateCafeDto) {
    console.log(cafeParams);
    if (!cafeParams.id) {
      throw new BadRequestException('Missing id!');
    }
    return this.appService.updateCafe(cafeParams);
  }

  @Delete('cafe')
  deleteCafe(@Body('id') id: string) {
    if (!id) {
      throw new BadRequestException('Missing id!');
    }
    return this.appService.deleteCafe(id);
  }

  @Get('employees')
  getEmployees(@Query('id') id: string) {
    return this.appService.getEmployees(id);
  }

  @Post('employee')
  createEmployees(@Body() employeesParams: CreateEmployeeDto) {
    const { cafe, name, email_address, phone_number, gender, work_start_date } =
      employeesParams;
    console.log(123);
    if (
      !cafe ||
      !name ||
      !email_address ||
      !phone_number ||
      !gender ||
      !work_start_date
    ) {
      throw new BadRequestException('Missing params!');
    }
    return this.appService.createEmployees(employeesParams);
  }

  @Put('employee')
  updateEmployees(@Body() employeesParams: CreateEmployeeDto) {
    if (!employeesParams.id) {
      throw new BadRequestException('Missing id!');
    }
    return this.appService.updateEmployees(employeesParams);
  }

  @Delete('employee')
  deleteEmployees(@Body('id') id: string) {
    if (!id) {
      throw new BadRequestException('Missing id!');
    }
    return this.appService.deleteEmployees(id);
  }
}
