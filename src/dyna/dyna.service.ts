import { Injectable } from '@nestjs/common';

@Injectable()
export class DynaService {
  getGreeting() {
    return 'This is from DynaService';
  }
}
