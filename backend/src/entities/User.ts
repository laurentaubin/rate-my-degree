import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseComment } from "./CourseComment";
import { Vote } from "./Vote";

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

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
