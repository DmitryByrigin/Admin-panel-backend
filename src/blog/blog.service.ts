import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogService {
  // addComment(arg0: number, createCommentDto: CreateCommentDto) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBlogDto) {
    console.log('Received DTO:', dto);

    const createdBlog = await this.prisma.blog.create({
      data: {
        image: dto.image,
        title: dto.title,
        content: dto.content,
        categories: dto.categories,
        userId: dto.userId,
      },
    });

    console.log('Created Blog:', createdBlog);

    return createdBlog;
  }

  async findAll() {
    return this.prisma.blog.findMany({
      include: {
        user: true,
      },
    });
  }

  async findAllByFiltered(options?: {
    orderBy?: {
      createdAt?: 'asc' | 'desc';
      like?: 'asc' | 'desc';
      views?: 'asc' | 'desc';
    };
  }) {
    const blogs = await this.prisma.blog.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        content: true,
        createdAt: true,
        like: true,
        views: true,
        categories: true,
        user: {
          select: {
            name: true,
            surname: true,
            profileImage: true,
          },
        },
      },
      orderBy: options?.orderBy,
    });

    blogs.forEach((blog) => {
      if (blog.content.length > 50) {
        blog.content = blog.content.substring(0, 100) + '...';
      }
    });

    return blogs;
  }

  async findOne(id: number) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            role: true,
            profileImage: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
                surname: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateBlogDto) {
    return this.prisma.blog.update({
      data: {
        title: dto.title,
        image: dto.image,
        content: dto.content,
        categories: dto.categories,
        userId: dto.userId,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    try {
      const post = await this.prisma.blog.findUnique({
        where: {
          id: parseInt(String(id)),
        },
      });
      if (post === null) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      const deletedPost = await this.prisma.blog.delete({
        where: {
          id: parseInt(String(id)),
        },
      });
      if (deletedPost === null) {
        throw new HttpException(
          'Error in deleting post',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return 'Post deleted successfully';
    } catch (error) {
      console.error('Error in deleting a post:', error);
      throw new HttpException(
        'Error in deleting a post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addLike(id: number, userId: string) {
    const blogInfo = await this.prisma.blog.findUnique({ where: { id } });

    let updatedLikes;

    if (blogInfo.like.includes(userId)) {
      // Remove user from the like array
      updatedLikes = blogInfo.like.filter((user) => userId !== user);
    } else {
      // Add user to the like array
      updatedLikes = [...blogInfo.like, userId];
    }

    // Update blogInfo.like with the updatedLikes
    blogInfo.like = updatedLikes;

    await this.prisma.blog.update({
      data: {
        like: updatedLikes,
      },
      where: {
        id,
      },
    });

    return updatedLikes.length;
  }

  // async countLikes(id: number) {
  //   return this.prisma.blog.aggregate({
  //     _count: { like: true },
  //     where: { id },
  //   });
  // }

  async addNewView(id: number, userId: string) {
    try {
      const blogInfo = await this.prisma.blog.findUnique({ where: { id } });

      if (!blogInfo) {
        throw new NotFoundException('Blog post not found');
      }

      if (blogInfo.views.includes(userId)) {
        console.log('User has already viewed this post');
        return blogInfo;
      }

      blogInfo.views.push(userId);

      const updatedBlog = await this.prisma.blog.update({
        data: {
          views: blogInfo.views,
        },
        where: {
          id,
        },
      });

      console.log('Blog post views updated:', updatedBlog);

      return updatedBlog;
    } catch (error) {
      console.error('Error in addNewView:', error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }

  async addComment(
    userId: string,
    blogId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<any> {
    const blogInfo = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });
    console.log(blogInfo.userId);
    try {
      return await this.prisma.comment.create({
        data: {
          text: createCommentDto.text,
          userId: userId,
          blogId: blogId,
        },
      });
    } catch (error) {
      console.error('Error in addComment:', error);
      throw new Error('Failed to add a comment!');
    }
  }

  async deleteComment(_id: number, commentId: number): Promise<any> {
    try {
      return await this.prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    } catch (error) {
      console.error('Error in deleteComment:', error);
      throw new Error('Failed to delete a comment!');
    }
  }

  async getCommentsForBlogPost(id: number) {
    return this.prisma.comment.findMany({
      where: {
        blogId: id,
      },
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            profileImage: true,
          },
        },
      },
    });
  }
}
