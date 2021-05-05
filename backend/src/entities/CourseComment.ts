import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";
import { Vote } from "./Vote";

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

  @ManyToOne(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Field()
  userVote: number;

  @Field()
  isUserAuthor: boolean;

  @Field(() => String)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
