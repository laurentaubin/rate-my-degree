import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";
import { Course } from "./Course";

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
  course: Course;

  @Field(() => String)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
