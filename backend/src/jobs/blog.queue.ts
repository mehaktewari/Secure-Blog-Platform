import { Queue } from 'bullmq'

export const blogQueue = new Queue('blog-summary', {
  connection: {
    url: process.env.REDIS_URL!, 
  },
})