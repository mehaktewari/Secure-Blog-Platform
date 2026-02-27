import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common'
import { BlogService } from './blog.service'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // ✅ PUBLIC - Get all blogs
  @Get()
  getAll() {
    return this.blogService.getAll()
  }

  // ✅ PUBLIC - Get single blog by slug
  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.blogService.getOne(slug)
  }

  // 🔐 PROTECTED ROUTES BELOW

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateBlogDto) {
    return this.blogService.create(req.user.userId, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogService.update(req.user.userId, id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.blogService.delete(req.user.userId, id)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Request() req, @Param('id') id: string) {
    return this.blogService.likeBlog(req.user.userId, id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlike(@Request() req, @Param('id') id: string) {
    return this.blogService.unlikeBlog(req.user.userId, id)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.blogService.addComment(
      req.user.userId,
      id,
      dto.content,
    )
  }
}