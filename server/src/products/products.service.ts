import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

  find(params) {
    let query = this.dataSource
      .getRepository(Product)
      .createQueryBuilder('product');

    if (params.id) query = query.where('product.id = :id', { id: params.id });
    if (params.name)
      query = query.where('product.name = :name', { name: params.name });

    if (params.sort && params.order)
      query = query.orderBy(`${params.sort}`, params.order);

    if (typeof params.offset !== undefined && params.offset > 0)
      query = query.skip(params.offset);

    if (typeof params.limit !== undefined && params.limit > 0)
      query = query.take(params.limit);

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
