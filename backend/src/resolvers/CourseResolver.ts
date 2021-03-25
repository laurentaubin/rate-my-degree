import { Course } from "../entities/Course";
import { CreateCourseInput } from "../inputs/CreateCourseInput";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AddCommentInput } from "../inputs/AddCommentInput";
import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CourseInput } from "../inputs/CourseInput";

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return await getConnection()
      .getRepository(Course)
      .createQueryBuilder("course")
      .innerJoinAndSelect("course.comments", "course_comment")
      .getMany();
  }

  @Query(() => Course)
  async course(@Arg("data") data: CourseInput): Promise<Course | undefined> {
    const { attribute, order } = data.sortBy;

    const course = await getConnection()
      .getRepository(Course)
      .createQueryBuilder("course")
      .innerJoinAndSelect("course.comments", "course_comment")
      .orderBy(attribute, order)
      .where("course.initials = :initials", { initials: data.initials })
      .getOne();

    for (const comment of course!.comments) {
      if (comment.parentId) {
        comment.isSubComment = true;
      }
    }

    return course;
  }

  @Mutation(() => Course)
  async createCourse(@Arg("data") data: CreateCourseInput): Promise<Course> {
    const course = Course.create({ ...data, comments: [] });
    await course.save();
    return course;
  }

  @Mutation(() => Boolean)
  async addComment(@Arg("data") data: AddCommentInput): Promise<Boolean> {
    const { courseInitials, content, parentId } = data;
    const commentId = uuidv4();

    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
        insert into course_comment ("id", "courseInitials", "content", "parent_id")
        values ($1, $2, $3, $4)
    `,
        [commentId, courseInitials, content, parentId]
      );
    });

    return true;
  }
}
