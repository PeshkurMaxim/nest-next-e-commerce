import { Allow } from 'class-validator';
import { SeoShopBaseTDO } from 'src/common/BaseTdo/SeoShopBaseTDO';

export class CreateCategoryDto extends SeoShopBaseTDO {
  @Allow()
  parent: number | null;
}
