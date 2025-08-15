import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'date' })
  releaseDate: string;

  @Column({ type: 'int' })
  power: number;

  @Column({ type: 'varchar', length: 500 })
  image: string;
}
