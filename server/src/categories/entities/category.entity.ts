import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { SeoShopBaseEntity } from 'src/common/BaseEntities/SeoShopBaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category extends SeoShopBaseEntity {
  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.children)
  parent: number;

  @ApiProperty()
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
