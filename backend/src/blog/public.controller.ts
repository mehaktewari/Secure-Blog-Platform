import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common'
import { BlogService } from './blog.service'

@Controller('public')
export class PublicBlogController {
  constructor(private blogService: BlogService) {}

  @Get('blogs/:slug')
  async getPublicBlog(@Param('slug') slug: string) {
    const blog = await this.blogService.findPublishedBySlug(slug)

    if (!blog) {
      throw new NotFoundException('Blog not found')
    }

    return blog
  }

  @Get('feed')
  async getPublicFeed(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.blogService.getPublicFeed(
      Number(page),
      Number(limit),
    )
  }
  @Get('blogs/:id/comments')
  getComments(@Param('id') id: string) {
    return this.blogService.getComments(id)
  }
}