import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/decorators/publicRouter';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.usersService.findAll(query);
  }

  // @Get(':id')
  // findById(@Param('id') userId: number) {
  //   return this.usersService.findById(userId);
  // }

  // @Post('getByBlock')
  // getUserByBlock(@Body() data: any) {
  //   return this.usersService.getUserByBlock(data);
  // }

  // @Get('profileWallet')
  // findOne(@Request() req) {
  //   return this.usersService.findOneWallet(req.user);
  // }

  @Get('profile')
  findOneProfile(@Request() req) {
    return this.usersService.findOneProfile(req.user);
  }

  @Patch('update')
  update(@Request() req, @Body('isActive') isActive: boolean) {
    return this.usersService.update(req.user, isActive);
  }

  @Public()
  @Delete('revert')
  remove(@Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.remove(deleteUserDto);
  }
}
