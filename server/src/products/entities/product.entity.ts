import { Entity, JoinTable, ManyToMany, OneToMany, RelationId } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { Category } from 'src/categories/entities/category.entity';
import { SeoShopBaseEntity } from 'src/common/BaseEntities/SeoShopBaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product extends SeoShopBaseEntity {
  @ApiProperty()
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @RelationId((product: Product) => product.categories)
  categoriesIds: number[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];
}
