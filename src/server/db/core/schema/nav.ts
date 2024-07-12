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
import { type AdapterAccount } from "next-auth/adapters";
import { env } from "~/env";

const prefix = env.DATABASE_PREFIX;

export const createTable = mysqlTableCreator((name) => `${prefix}_${name}`);

// Navigation
export const menuPlacements = createTable(
  "menuPlacements",
  {
    id: int("id", { length: 11 })
      .notNull()
      .primaryKey()
      .autoincrement(),
    name: varchar("name", { length: 20 }).notNull(),
  }
);

export const menu = createTable(
  "menu",
  {
    id: int("id", { length: 11 })
      .notNull()
      .primaryKey()
      .autoincrement(),
    parent_id: int("parent_id", { length: 11 }),
    menu: int("menu", { length: 11 }).notNull()
      .references(() => menuPlacements.id),
    label: varchar("label", { length: 20 }).notNull(),
    href: varchar("href", { length: 40 }).notNull(),
  }
);

export const menuRelations = relations(menu, ({ one }) => ({
  menu: one(menu, { fields: [menu.parent_id], references: [menu.id] }),
  menuPlacements: one(menuPlacements, { fields: [menu.menu], references: [menuPlacements.id] }),
}));