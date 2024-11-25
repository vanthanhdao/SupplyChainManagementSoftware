import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  // Add a new category to the database
  async create(createCategoryDto: CreateCategoryDto): Promise<Categories> {
    try {
      const { categoryName, description } = createCategoryDto;
      const category = this.categoriesRepository.create({
        CategoryName: categoryName,
        Description: description,
      });
      await this.categoriesRepository.save(category);
      return category;
    } catch (error) {
      throw new Error(`Create categoy failed: ${error} `);
    }
  }

  async findAll(query: any) {
    const { page, limit } = query;
    if (page && limit) {
      const [result, total] = await this.categoriesRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        // order: { id: 'DESC' },
      });
      return { data: result, total };
    }
    return await this.categoriesRepository.find();
  }

  // Add list new Category to the database
  async createListCategory(data: CreateCategoryDto[]) {
    try {
      data.forEach(async (item) => {
        const Category = this.categoriesRepository.create({
          CategoryName: item.categoryName,
          Description: item.description,
        });
        if (!Category)
          throw new Error(`Category with ${Category.CategoryId} is not exists`);
        await this.categoriesRepository.save(Category);
      });
    } catch (error) {
      throw new Error(`Create Category failed: ${error} `);
    }
  }

  // Update list new Category to the database
  async updateListCategory(data: UpdateCategoryDto[]) {
    try {
      data.forEach(async (item) => {
        const Category = await this.categoriesRepository.findOneBy({
          CategoryId: item.categoryId,
        });
        if (!Category)
          throw new Error(`Category with ${Category.CategoryId} is not exists`);
        const updateDate = new Date();
        Category.CategoryName = item.categoryName;
        Category.Description = item.description;
        Category.UpdateAt = updateDate.toString();
        await this.categoriesRepository.save(Category);
      });
    } catch (error) {
      throw new Error(`Create Category failed: ${error} `);
    }
  }

  // Update list new Category to the database
  async deleteListCategory(data: UpdateCategoryDto[]) {
    try {
      data.forEach(async (item) => {
        const Category = await this.categoriesRepository.findOneBy({
          CategoryId: item.categoryId,
        });
        if (!Category)
          throw new Error(`Category with ${Category.CategoryId} is not exists`);
        await this.categoriesRepository.delete(Category.CategoryId);
      });
    } catch (error) {
      throw new Error(`Create Category failed: ${error} `);
    }
  }

  updateRecord(data: any) {
    const createCategory = data.filter(
      (item) => item.isNew && item.active === null,
    );
    const updateCategory = data.filter(
      (item) => !item.isNew && item.active === null,
    );
    const deleteCategory = data.filter(
      (item) => !item.isNew && item.active === 'delete',
    );
    if (createCategory && createCategory.length > 0)
      this.createListCategory(createCategory);
    if (updateCategory && updateCategory.length > 0)
      this.updateListCategory(updateCategory);
    if (deleteCategory && deleteCategory.length > 0)
      this.deleteListCategory(deleteCategory);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
