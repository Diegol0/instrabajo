import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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
  update( @Body() adressDto: ReviewDTO) {
    return this.reviewService.update( adressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
