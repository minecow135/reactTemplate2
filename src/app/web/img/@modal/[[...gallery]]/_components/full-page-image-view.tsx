

import { getImage } from "~/server/db/img/queries/img";
import { ExitButton } from "./modal";

import { headers } from 'next/headers';

import ExifReader from 'exifreader';
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export async function FullPageImageView(props: { photoId: string }) {
  const headersList = headers();
  const http = headersList.get('x-forwarded-proto');
  const hostname = headersList.get('x-forwarded-host');
  const url = http + "://" + hostname;

  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);
  const tags = await ExifReader.load(url + image[0]?.img.img);

  console.log(image)
  console.log(tags["Image Width"])

  return (
    <div className="p-10 min-w-0 text-card-foreground">
      <div className="flex w-full border-b">
        <span className="flex-1 p-2 text-xl">{image[0]?.img.title}</span>
        <ExitButton />
      </div>
      <div className="flex flex-wrap pt-10">
        <div className="flex-shrink flex-grow pr-10">
          <img src={image[0]?.img.img} className="object-contain" alt={image[0]?.img.title} />
        </div>
        <div className="flex flex-shrink-0 flex-col max-w-[50%]">

          <div className="px-2 pb-3">
            <span>{image[0]?.img.description}</span>
          </div>

          <div className="px-2 py-3">
            <span>Uploaded By: {image[0]?.user?.name}</span>
          </div>

          <div className="px-2 py-3">
            <span>{tags["Image Width"]?.description} x {tags["Image Height"]?.description}</span>
          </div>

          <div className="FILLER grow" />

          <div className="px-2 pt-3">
            <span>Created On: {image[0]?.img.dateCreated.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}