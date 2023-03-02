import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { ShopBaseEntity } from './ShopBaseEntity';
import rusTranslitToEng from '../helpers/translit';
import { ApiProperty } from '@nestjs/swagger';

export abstract class SeoShopBaseEntity extends ShopBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  path: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  h1: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  keywords: string;

  @BeforeUpdate()
  @BeforeInsert()
  setSeo() {
    const translit = rusTranslitToEng(this.name, true, '-');

    if (!this.path) this.path = translit;
    if (!this.h1) this.h1 = translit;
    if (!this.title) this.title = translit;
    if (!this.description) this.description = translit;
  }
}
