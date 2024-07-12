import { type Config } from "drizzle-kit";

import { env } from "~/env";

const filter = env.DATABASE_URL + "_*";

export default {
  schema: "./src/server/db/**/schema/*",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [filter],
  strict: true,
} satisfies Config;
