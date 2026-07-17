import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    restaurantId: string,
    dto: CreateCustomerDto,
  ) {
    return this.prisma.customer.create({
      data: {
        restaurantId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
      },
    });
  }

  async findAll(restaurantId: string) {
    return this.prisma.customer.findMany({
      where: {
        restaurantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    restaurantId: string,
    id: string,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id,
        restaurantId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(
    restaurantId: string,
    id: string,
    dto: UpdateCustomerDto,
  ) {
    await this.findOne(restaurantId, id);

    return this.prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(
    restaurantId: string,
    id: string,
  ) {
    await this.findOne(restaurantId, id);

    await this.prisma.customer.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Customer deleted successfully',
    };
  }
}