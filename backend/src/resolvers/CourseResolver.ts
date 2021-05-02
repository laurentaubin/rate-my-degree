import { Course } from "../entities/Course";
import { CreateCourseInput } from "../inputs/CreateCourseInput";
import { Resolver, Query, Mutation, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { AddCommentInput } from "../inputs/AddCommentInput";
import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CourseInput } from "../inputs/CourseInput";
import { UserInputError } from "apollo-server-errors";
import { CourseComment } from "../entities/CourseComment";
import { MyContext } from "src/types";
import { verifyUserIsAuthenticated } from "src/utils/verifyUserIsAuthenticated";

@Resolver((_of) => Course)
export class CourseResolver {
  @Query(() => [Course])
  async courses(@Arg("filters") filter: string, @Arg("limit", { nullable: true }) limit: number): Promise<Course[]> {
    if (!filter) {
      return [];
    }

    return await getConnection()
      .getRepository(Course)
      .createQueryBuilder("course")
      .select()
      .where("LOWER(title) LIKE LOWER(:filters)", { filters: `%${filter}%` })
      .orWhere("LOWER(initials) LIKE LOWER(:filters)", { filters: `%${filter}%` })
      .orWhere("LOWER(professor) LIKE LOWER(:filters)", { filters: `%${filter}%` })
      .orderBy("course.initials")
      .take(limit)
      .getMany();
  }

  @Query(() => Course)
  course(@Arg("data") data: CourseInput): Promise<Course | undefined> {
    return getConnection()
      .getRepository(Course)
      .createQueryBuilder("course")
      .select()
      .where("course.initials = :initials", { initials: data.initials })
      .getOne();
  }

  @Mutation(() => Course)
  async createCourse(@Arg("data") data: CreateCourseInput): Promise<Course> {
    const course = Course.create({ ...data, comments: [], initials: data.initials.toLowerCase() });
    await course.save();
    return course;
  }

  @Mutation(() => Boolean)
  async addComment(@Ctx() { currentUser }: MyContext, @Arg("data") data: AddCommentInput): Promise<Boolean | Error> {
    verifyUserIsAuthenticated(currentUser);

    const { courseInitials, content, parentId } = data;
    const { id: authorId } = currentUser;

    if (!content) {
      throw new UserInputError("Comment content cannot be empty");
    }
    const commentId = uuidv4();

    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
        insert into course_comment ("id", "course_initials", "content", "parent_id", "author_id")
        values ($1, $2, $3, $4, $5)
    `,
        [commentId, courseInitials, content, parentId, authorId]
      );
    });

    return true;
  }

  @FieldResolver()
  comments(
    @Root() course: Course,
    @Arg("attribute", (_type) => String, { defaultValue: "score" }) attribute: "score" | "date",
    @Arg("order", (_type) => String, { defaultValue: "DESC" }) order: "ASC" | "DESC"
  ): Promise<CourseComment[]> {
    return getConnection()
      .getRepository(CourseComment)
      .createQueryBuilder("course_comment")
      .leftJoinAndSelect("course_comment.author", "user")
      .orderBy(attribute, order)
      .where("course_comment.course_initials = :initials", { initials: course.initials })
      .andWhere("course_comment.parentId is null")
      .getMany();
  }
}
