import { Queue } from 'bullmq'

export const blogQueue = new Queue('blog-summary', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
})