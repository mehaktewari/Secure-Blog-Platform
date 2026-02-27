import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { generateSlug } from './utils/slug.util'
import { blogQueue } from '../jobs/blog.queue'

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBlogDto) {
    const slug = generateSlug(dto.title)

    return this.prisma.blog.create({
      data: {
        ...dto,
        slug,
        userId,
      },
    })
  }

  async update(userId: string, blogId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    })

    if (!blog) throw new NotFoundException('Blog not found')

    if (blog.userId !== userId)
      throw new ForbiddenException('Not your blog')

    return this.prisma.blog.update({
      where: { id: blogId },
      data: dto,
    })

    const updatedBlog = await this.prisma.blog.update({
        where: { id: blogId },
        data: dto,
    })

    if (dto.isPublished) {
        await blogQueue.add('generate-summary', {
            blogId: updatedBlog.id,
            content: updatedBlog.content,
        })
    }
    return updatedBlog
  }

  async delete(userId: string, blogId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    })

    if (!blog) throw new NotFoundException('Blog not found')

    if (blog.userId !== userId)
      throw new ForbiddenException('Not your blog')

    return this.prisma.blog.delete({
      where: { id: blogId },
    })
  }
  async findPublishedBySlug(slug: string) {
        return this.prisma.blog.findFirst({
            where: {
                slug,
                isPublished: true,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        })
    }
    async getPublicFeed(page: number, limit: number) {
        const skip = (page - 1) * limit

        const blogs = await this.prisma.blog.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        })

        const total = await this.prisma.blog.count({
            where: { isPublished: true },
        })

        return {
            data: blogs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
    }
    async likeBlog(userId: string, blogId: string) {
        try {
            await this.prisma.like.create({
                data: {
                    userId,
                    blogId,
                },
            })
        } catch (error) {
            return { message: 'Already liked' }
        }
        const count = await this.prisma.like.count({
            where: { blogId },
        })
        return { likeCount: count }
    }
    async unlikeBlog(userId: string, blogId: string) {
        await this.prisma.like.deleteMany({
            where: {
                userId,
                blogId,
            },
        })
        const count = await this.prisma.like.count({
            where: { blogId },
        })
        return { likeCount: count }
    }
    async addComment(userId: string, blogId: string, content: string) {
        await this.prisma.comment.create({
            data: {
                content,
                userId,
                blogId,
            },
        })

        return this.getComments(blogId)
    }

    async getComments(blogId: string) {
        return this.prisma.comment.findMany({
            where: { blogId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        })
    }
    async getAll() {
        return this.prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        })
    }
    async getOne(slug: string) {
        return this.prisma.blog.findUnique({
            where: { slug },
            include: {
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        })
    }
}