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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUser as CurrentUserType,
} from '../auth/decorators/current-user.decorator';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(
    @CurrentUser() user: CurrentUserType,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customersService.create(user.restaurantId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserType) {
    return this.customersService.findAll(user.restaurantId);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: CurrentUserType,
    @Param('id') id: string,
  ) {
    return this.customersService.findOne(user.restaurantId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserType,
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(
      user.restaurantId,
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: CurrentUserType,
    @Param('id') id: string,
  ) {
    return this.customersService.remove(user.restaurantId, id);
  }
}