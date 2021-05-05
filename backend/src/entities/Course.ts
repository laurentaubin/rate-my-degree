import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CourseComment } from "./CourseComment";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryColumn()
  initials!: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field()
  @Column()
  professor!: string;

  @Field(() => [CourseComment])
  @OneToMany(() => CourseComment, (courseComment) => courseComment.course)
  comments: CourseComment[];
}
