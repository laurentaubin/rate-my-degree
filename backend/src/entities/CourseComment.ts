import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@ObjectType()
@Entity()
export class CourseComment extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Column({ name: "parent_id", default: null })
  parentId: string;

  @Field(() => [CourseComment], { nullable: true })
  subComments: CourseComment[];

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Course, (course) => course.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_initials" })
  course: Course;

  @Field()
  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: "author_id" })
  author: User;

  @Field(() => String)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
