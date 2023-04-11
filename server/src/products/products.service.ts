import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs/promises';
import { Category } from 'src/categories/entities/category.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: Array<Express.Multer.File>,
  ) {
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

    await this.saveImages(newProduct, images);
    return this.productRepository.save(newProduct);
  }

  async deleteProductImages(productId: number): Promise<void> {
    const images = await this.productImageRepository.find({
      where: { product: { id: productId } },
    });
    await Promise.all(
      images.map(async (image) => {
        const path = `/upload/images/products/${image.filename}`;
        await unlink(path);
        await this.productImageRepository.remove(image);
      }),
    );
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    images: Array<Express.Multer.File>,
  ) {
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
    await this.saveImages(updatedProduct, images);
    return this.productRepository.save(updatedProduct);
  }

  remove(id: number) {
    return this.productRepository.delete({ id: id });
  }

  async saveImages(product: Product, images: Array<Express.Multer.File>) {
    const productImages = images.map((image) => {
      const productImage = new ProductImage();
      productImage.filename = image.filename;
      productImage.sort = 0;

      return productImage;
    });

    productImages.forEach((image) => {
      image.product = product;
    });

    return await this.productImageRepository.save(productImages);
  }
}
