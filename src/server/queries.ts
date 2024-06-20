import "server-only";
import { db } from "./db";

export async function userInfo() {
  const images = await db.query.users.findFirst({
  });

  return images;
}