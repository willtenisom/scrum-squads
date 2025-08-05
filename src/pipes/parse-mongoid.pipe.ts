import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`O valor '${value}' não é um ObjectId válido.`);
    }
    return value;
  }
}
