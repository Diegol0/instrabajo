import { PartialType } from '@nestjs/mapped-types';
import { ReviewDTO } from './create-review.dto';

export class UpdateReviewDto extends PartialType(ReviewDTO) {}
