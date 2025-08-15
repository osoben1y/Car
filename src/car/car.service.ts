import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(dto: CreateCarDto, imagePath: string): Promise<Car> {
    const car = this.carRepository.create({ ...dto, image: imagePath });
    return await this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  async update(id: number, dto: UpdateCarDto, imagePath?: string): Promise<Car> {
    const car = await this.findOne(id);
    Object.assign(car, dto);
    if (imagePath) car.image = imagePath;
    return await this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.carRepository.remove(car);
  }
}
