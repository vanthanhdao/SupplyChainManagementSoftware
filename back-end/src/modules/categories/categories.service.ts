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
    try{
      const { categoryName,description} = createCategoryDto;
      const category = this.categoriesRepository.create({
        CategoryName:categoryName,
        Description: description,
      });
      await this.categoriesRepository.save(category);
      return category;
    }catch(error){
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
