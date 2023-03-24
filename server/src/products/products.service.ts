import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  find(limit: number, offset: number, sort: string, order: 'ASC' | 'DESC') {
    let query = this.dataSource
      .getRepository(Product)
      .createQueryBuilder('product');

    if (sort && order) query = query.orderBy(`${sort}`, order);

    if (typeof offset !== undefined && offset > 0) query = query.skip(offset);

    if (typeof limit !== undefined && limit > 0) query = query.take(limit);

    return query.getMany();
  }

  count() {
    return this.productRepository.count();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.dataSource
      .createQueryBuilder()
      .update(Product)
      .set(updateProductDto)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.productRepository.delete({ id: id });
  }
}
