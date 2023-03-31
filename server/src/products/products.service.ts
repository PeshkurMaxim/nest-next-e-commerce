import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { DataSource, In, Repository } from 'typeorm';
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

  async create(createProductDto: CreateProductDto) {
    let categories = [];

    if (createProductDto.categoriesIds != null) {
      categories = await this.dataSource.getRepository(Category).find({
        where: { id: In(createProductDto.categoriesIds) },
      });
    }

    delete createProductDto.categoriesIds;

    const newProductObj = {
      ...createProductDto,
      categories,
    };

    const newProduct = this.productRepository.create(newProductObj);
    return this.productRepository.save(newProduct);
  }

  find(params) {
    let query = this.dataSource
      .getRepository(Product)
      .createQueryBuilder('product');

    if (params.id) query = query.where('product.id = :id', { id: params.id });
    if (params.name)
      query = query.where('product.name like :name', {
        name: `%${params.name}%`,
      });

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
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });

    let categories = [];

    if (updateProductDto.categoriesIds != null) {
      categories = await this.dataSource.getRepository(Category).find({
        where: { id: In(updateProductDto.categoriesIds) },
      });
    }

    delete updateProductDto.categoriesIds;
    delete product.categories;

    const updatedProductObj = {
      ...product,
      ...updateProductDto,
      categories: categories,
    };

    const updatedProduct = this.productRepository.create(updatedProductObj);
    return this.productRepository.save(updatedProduct);
  }

  remove(id: number) {
    return this.productRepository.delete({ id: id });
  }
}
