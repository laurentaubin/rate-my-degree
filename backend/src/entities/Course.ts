import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from "typeorm";
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
