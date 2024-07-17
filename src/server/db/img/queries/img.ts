import "server-only";
import { db } from "../drizzle/img";
import { album, img } from "../schema/img";
import { eq, isNull } from 'drizzle-orm';

export async function getAlbum(parent: number) {
  let result;
  if (!parent) {
    result = await db.select().from(album).where(isNull(album.parent_id));
  } else {
    result = await db.select().from(album).where(eq(album.parent_id, parent));
  }

  return result;
}

export async function getImg(parent: number) {
  let result;
  if (!parent) {
    result = await db.select().from(img).where(isNull(img.parent_id));
  } else {
    result = await db.select().from(img).where(eq(img.parent_id, parent));
  }

  return result;
}

export async function getImage(id: number) {
  const image = await db.query.img.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  return image;
}
