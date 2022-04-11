import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Code) private codesRepository: Repository<Code>,
  ) {
  }

  // noinspection JSUnusedLocalSymbols
  create(createCodeDto: CreateCodeDto) {
    return 'This action adds a new code';
  }

  async findAll() {
    return await this.codesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  // noinspection JSUnusedLocalSymbols
  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}