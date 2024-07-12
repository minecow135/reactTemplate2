import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { env } from "~/env";

const prefix = env.DATABASE_PREFIX;

export const createTable = mysqlTableCreator((name) => `${prefix}_${name}`);

export const album = createTable(
  "album",
  {
    id: int("id", { length: 11 })
      .notNull()
      .primaryKey()
      .autoincrement(),
    parent_id: int("parent_id", { length: 11 }),
    title: varchar("title", { length: 20 }).notNull(),
    description: text("description").notNull(),
    dateCreated: timestamp("dateCreated"),
    lastModified: timestamp("dateCreated"),
  }
);