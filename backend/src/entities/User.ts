import { ObjectType, Field } from "type-graphql";
import { Entity, Column, BaseEntity, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { CourseComment } from "./CourseComment";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
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
  @OneToMany(() => CourseComment, (courseComment) => courseComment.author)
  comments: CourseComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
