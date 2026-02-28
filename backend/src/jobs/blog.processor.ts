import { Worker } from 'bullmq'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

new Worker(
  'blog-summary',
  async job => {
    const { blogId, content } = job.data

    const summary = content.slice(0, 150) + '...'

    await prisma.blog.update({
      where: { id: blogId },
      data: { summary },
    })
  },
  {
    connection: {
      url: process.env.REDIS_URL!, 
    },
  },
)