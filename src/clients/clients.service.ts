import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { Client } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create(createClientDto);
      return client;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `${JSON.stringify(error.keyValue)} repetido`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException('Error al crear un cliente');
    }
  }

  async findAll() {
    const clients = await this.clientModel.find();
    return clients;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
