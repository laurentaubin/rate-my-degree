import { Course } from "../entities/Course";
import { CreateCourseInput } from "../inputs/CreateCourseInput";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AddCommentInput } from "../inputs/AddCommentInput";
import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

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
  async course(@Arg("initials") initials: string): Promise<Course | undefined> {
    return await getConnection()
      .getRepository(Course)
      .createQueryBuilder("course")
      .innerJoinAndSelect("course.comments", "course_comment")
      .where("course.initials = :initials", { initials: initials })
      .getOne();
  }

  @Mutation(() => Course)
  async createCourse(@Arg("data") data: CreateCourseInput): Promise<Course> {
    const course = Course.create({ ...data, comments: [] });
    await course.save();
    return course;
  }

  @Mutation(() => Course)
  async addComment(@Arg("data") data: AddCommentInput): Promise<Course | undefined> {
    const { courseInitials, content } = data;
    const commentId = uuidv4();

    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
        insert into course_comment ("id", "courseInitials", "content")
        values ($1, $2, $3)
    `,
        [commentId, courseInitials, content]
      );
    });

    return Course.findOne({ where: { initials: courseInitials } });
  }
}
