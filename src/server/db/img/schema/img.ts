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
import { users } from "../../core/schema/auth";
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
    img: text("img").notNull(),
    dateCreated: timestamp("dateCreated").notNull().defaultNow(),
    lastModified: timestamp("lastModified").notNull().$onUpdate(() => (sql`CURRENT_TIMESTAMP`)),
    userId: varchar("userId", { length: 255 }).references(() => users.id),
  }
);

export const img = createTable(
  "img",
  {
    id: int("id", { length: 11 })
      .notNull()
      .primaryKey()
      .autoincrement(),
    parent_id: int("parent_id", { length: 11 }),
    title: varchar("title", { length: 20 }).notNull(),
    description: text("description").notNull(),
    img: text("img").notNull(),
    dateCreated: timestamp("dateCreated").notNull().defaultNow(),
    lastModified: timestamp("lastModified").notNull().$onUpdate(() => (sql`CURRENT_TIMESTAMP`)),
    userId: varchar("userId", { length: 255 }).references(() => users.id),
  }
);