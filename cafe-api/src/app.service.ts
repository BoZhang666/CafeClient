import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCafeDto, CreateEmployeeDto } from './app.controller';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getCafes(location: string) {
    if (location) {
      return this.prisma.cafe.findMany({
        where: {
          location,
        },
      });
    }
    return this.prisma.cafe.findMany();
  }

  createCafe(cafeParams: CreateCafeDto) {
    return this.prisma.cafe.create({
      data: { ...cafeParams, id: uuidv4() },
    });
  }

  updateCafe(cafeParams: CreateCafeDto) {
    return this.prisma.cafe.update({
      where: {
        id: cafeParams.id,
      },
      data: cafeParams,
    });
  }

  deleteCafe(id: string) {
    return this.prisma.cafe.delete({
      where: {
        id,
      },
    });
  }

  getEmployees(id: string) {
    if (id) {
      return this.prisma.employee.findMany({
        where: {
          id,
        },
        include: {
          cafe: true,
        },
      });
    }
    return this.prisma.employee.findMany({ include: { cafe: true } });
  }

  createEmployees(employeesParams: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        name: employeesParams.name,
        email_address: employeesParams.email_address,
        phone_number: employeesParams.phone_number,
        gender: employeesParams.gender,
        work_start_date: employeesParams.work_start_date,
        cafe: { connect: { id: employeesParams.cafe } },
      },
      include: { cafe: true },
    });
  }

  updateEmployees(employeesParams: CreateEmployeeDto) {
    const { id, ...data } = employeesParams;
    return this.prisma.employee.update({
      where: { id },
      data: {
        name: data.name,
        email_address: data.email_address,
        phone_number: data.phone_number,
        gender: data.gender,
        work_start_date: data.work_start_date,
        cafe: { connect: { id: employeesParams.cafe } },
      },
      include: { cafe: true },
    });
  }
  deleteEmployees(id: string) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
