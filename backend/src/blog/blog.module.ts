import { Module } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogController } from './blog.controller'
import { PublicBlogController } from './public.controller'

@Module({
  controllers: [BlogController, PublicBlogController],
  providers: [BlogService],
})
export class BlogModule {}