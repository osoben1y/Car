import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarsService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { diskStorage } from 'multer';
import { ApiTags, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { extname, join } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  private ensureUploadPath() {
    const uploadPath = join(process.cwd(), 'uploads', 'cars');
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = join(process.cwd(), 'uploads', 'cars');
          if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
          }
          cb(null, path);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const car = await this.carsService.create(dto, file.filename);
    return {
      ...car,
      imageUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/cars/image/${file.filename}`,
    };
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @ApiParam({
    name: 'filename',
    type: 'string',
    example: '1692108431-123456789.png',
  })
  @Get('image/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', 'cars', filename);

    if (!existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.sendFile(filePath);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCarDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = join(process.cwd(), 'uploads', 'cars');
          if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
          }
          cb(null, path);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCarDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const car = await this.carsService.update(id, dto, file?.filename);
    return {
      ...car,
      imageUrl: file
        ? `${process.env.BASE_URL || 'http://localhost:3000'}/cars/image/${file.filename}`
        : `${process.env.BASE_URL || 'http://localhost:3000'}/cars/image/${car.image}`,
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
