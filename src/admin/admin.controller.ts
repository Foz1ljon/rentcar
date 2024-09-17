import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, // So'rov parametrlarini ishlatish uchun Query import qilindi
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('admin') // Swagger'da admin bilan bog'liq marshrutlarni guruhlash uchun teg
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' }) // Operatsiya haqida qisqacha ma'lumot
  @ApiResponse({
    status: 201,
    description: 'Admin muvaffaqiyatli yaratildi',
    type: User, // Agar kerak bo'lsa, to'g'ri javob DTO'si bilan almashtiring
  })
  @ApiResponse({
    status: 409,
    description: 'Admin allaqachon mavjud',
  })
  create(@Body() createAdminDto: AddAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin login qilish' }) // Operatsiya haqida qisqacha ma'lumot
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli login qilindi',
    type: User, // Agar kerak bo'lsa, to'g'ri javob DTO'si bilan almashtiring
  })
  @ApiResponse({
    status: 404,
    description: 'Admin topilmadi',
  })
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlar ro'yxatini olish" })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Sahifa raqami, pagination uchun',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Sahifadagi adminlar soni',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Adminlarni qidirish uchun matn',
  })
  @ApiResponse({
    status: 200,
    description: "Adminlar ro'yxati",
    type: [User], // Foydalanuvchi obyektlarining massivi
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.adminService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Admin ID orqali olish' })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari",
    type: User, // Agar kerak bo'lsa, to'g'ri javob DTO'si bilan almashtiring
  })
  @ApiResponse({
    status: 404,
    description: 'Admin topilmadi',
  })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Admin ma'lumotlarini ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin topilmadi',
  })
  @ApiResponse({
    status: 409,
    description: 'Email boshqa admin tomonidan foydalanilmoqda',
  })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Adminni ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: 'Admin topilmadi',
  })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
