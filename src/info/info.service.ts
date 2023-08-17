import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class InfoService {
  async getCharacterInfo(name) {
    const Html = await axios.get(`https://maple.gg/u/${name}`);
    const $ = load(Html.data);
    const data = {
      level: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.user-summary > ul > li:nth-child(1)',
      ).text(),
      world: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > h3 > img',
      ).attr('alt'),
      job: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.user-summary > ul > li:nth-child(2)',
      ).text(),
      guild: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.row.row-normal.user-additional > div.col-lg-2.col-md-4.col-sm-4.col-12 > a',
      ).text(),
      lanking: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.row.row-normal.user-additional > div:nth-child(2) > span',
      ).text(),
      worldLanking: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.row.row-normal.user-additional > div:nth-child(3) > span',
      ).text(),
      jobLanking: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-8 > div > div.row.row-normal.user-additional > div:nth-child(5) > span',
      ).text(),
      characterUrl: $(
        '#user-profile > section > div.row.row-normal > div.col-lg-4.pt-1.pt-sm-0.pb-1.pb-sm-0.text-center.mt-2.mt-lg-0 > div > div.col-6.col-md-8.col-lg-6 > img',
      ).attr('src'),
    };
    data.level = data.level.substring(
      data.level.indexOf('.') + 1,
      data.level.indexOf('('),
    );
    data.level = `${data.level} Lv`;
    data.lanking = data.lanking.substring(0, data.lanking.indexOf('\n'));
    data.lanking = `${data.lanking}위`;
    if (data.guild === '') data.guild = '(없음)';
    return data;
  }
}
