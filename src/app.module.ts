import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './car/car.module';
import { Car } from './car/entities/car.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1421',
      database: 'cars_db',
      entities: [Car],
      synchronize: true,
    }),
    CarsModule,
  ],
})
export class AppModule {}
