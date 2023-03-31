import { Allow } from 'class-validator';
import { SeoShopBaseTDO } from 'src/common/BaseTdo/SeoShopBaseTDO';
export class CreateProductDto extends SeoShopBaseTDO {
  @Allow()
  categoriesIds: number[] | null;
}
