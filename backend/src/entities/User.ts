import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, CreateDateColumn } from "typeorm";
import { CourseComment } from "./CourseComment";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  pictureUrl: string;

  @Field(() => [CourseComment])
  @OneToMany(() => CourseComment, (courseComment) => courseComment.course)
  comments: CourseComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
