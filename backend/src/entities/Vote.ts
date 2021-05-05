import { ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseComment } from "./CourseComment";
import { User } from "./User";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => CourseComment, (comment) => comment.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "comment_id" })
  comment: CourseComment;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: "user_id" })
  user: User;
}
