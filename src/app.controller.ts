import { Controller, Get, Req } from '@nestjs/common';

@Controller('health-check')
export class AppController {
  @Get()
  public async healthCheck(@Req() request) {
    return `<p style='font-size: 20px'>
      health check route response <br>
      if you see this, app works <br>
      <img src='https://media2.giphy.com/media/WtOkaikiwaR87ZvAFH/200w.gif?cid=82a1493b34nxlpw7xaou8aoiqirmotuo8ifgxjax50mvm1yn&rid=200w.gif&ct=g' > 
    </p>`;
  }
}
