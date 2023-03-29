import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  find(params) {
    let query = this.dataSource
      .getRepository(Category)
      .createQueryBuilder('category');

    if (params.id) query = query.where('category.id = :id', { id: params.id });
    if (params.name)
      query = query.where('category.name like :name', {
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

  findAll() {
    return this.dataSource.query(
      `SELECT id, name, "parentId" as parent FROM category`,
    );
  }

  count() {
    return this.categoryRepository.count();
  }

  async findOne(id: number) {
    const category = await this.dataSource.query(
      `SELECT *, "parentId" as parent FROM category WHERE id=${id}`,
    );
    if (!category.length) throw new NotFoundException('category not found');

    delete category[0].parentId;
    return category[0];
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (id == updateCategoryDto.parent)
      throw new BadRequestException('uncorrect parent category');

    return this.dataSource
      .createQueryBuilder()
      .update(Category)
      .set(updateCategoryDto)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.categoryRepository.delete({ id: id });
  }
}
