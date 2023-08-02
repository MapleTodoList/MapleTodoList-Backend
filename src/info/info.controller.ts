import { Controller, Get, Param } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('/:name')
  getCh(@Param('name') name) {
    return this.infoService.getCharacterInfo(name);
  }
}
