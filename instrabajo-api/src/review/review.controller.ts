import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() adressDto: ReviewDTO) {
    return this.reviewService.create(adressDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':userId')
  findByEmployer(@Param('userId') id: string) {
    return this.reviewService.findByUser(id);
  }

  @Patch()
  update(@Body() adressDto: ReviewDTO) {
    return this.reviewService.update(adressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
