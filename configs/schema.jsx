import { json, varchar, serial, pgTable, boolean, integer } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").unique().notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("includeVideo").notNull().default("Yes"),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  courseBanner: varchar("courseBanner").default("/placeholder.png"),
  publish: boolean("public").default(false),
});

export const Chapters=pgTable('chapters',{
  id:serial('id').primaryKey(),
  courseId:varchar('courseid').notNull(),
  chapterId:integer('chapterId').notNull(),
  content:json('content').notNull(),
  videoId:varchar('videoId').notNull()
})
