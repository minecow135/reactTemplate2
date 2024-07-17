

import { getImage } from "~/server/db/img/queries/img";
import { ExitButton } from "./modal";

import { headers } from 'next/headers';

import ExifReader from 'exifreader';

export async function FullPageImageView(props: { photoId: string }) {
  const headersList = headers();
  const http = headersList.get('x-forwarded-proto');
  const hostname = headersList.get('x-forwarded-host');
  const url = http + "://" + hostname;

  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);
  const tags = await ExifReader.load(url + image.img);

  console.log(tags)

  return (
    <div className="flex p-10 h-full w-full min-w-0 text-card-foreground">
      <div className="flex-shrink flex-grow pr-10">
        <img src={image.img} className="object-contain" alt={image.title} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col">
        <div className="flex w-full border-b">
          <div className="flex-1 p-2 text-xl">{image.title}</div>
          <ExitButton />
        </div>

        <div className="p-2">
          <div>Uploaded By:</div>
        </div>  

        <div className="p-2">
          <div>Created On:</div>
          <div>{image.dateCreated.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}