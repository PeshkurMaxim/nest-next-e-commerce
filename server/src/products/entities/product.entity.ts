import { Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';
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
}
