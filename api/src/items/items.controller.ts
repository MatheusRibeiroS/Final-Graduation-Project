import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Items } from '../items';
import { Item } from '../item';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Items> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Item> {
    return this.itemsService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body('item') item: Item): Promise<void> {
    this.itemsService.create(item);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body('item') item: Item): Promise<void> {
    this.itemsService.update(item);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    this.itemsService.delete(id);
  }
}
