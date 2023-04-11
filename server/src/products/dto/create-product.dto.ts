import { Allow } from 'class-validator';
import { SeoShopBaseTDO } from 'src/common/BaseTdo/SeoShopBaseTDO';
import { Image } from 'src/common/interfaces/image';
export class CreateProductDto extends SeoShopBaseTDO {
  @Allow()
  categoriesIds: number[] | null;
  // images: Image[];
}
