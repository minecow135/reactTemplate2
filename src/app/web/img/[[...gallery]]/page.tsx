import Link from "next/link"

import { Separator } from "~/components/ui/separator"
import { getAlbum, getImg } from "~/server/db/img/queries/img"

async function Album(props: any) {
  let slug = props.props.gallery
  
  let album = []
  
  if (slug) {
    let slugNum: number = +slug;
    album = await getAlbum(slugNum);
  } else {
    album = await getAlbum(NaN);
  }

  return (
    <div className="flex w-full h-full flex-grow flex-col items-center">
      {
        album[0]?
          <div className = "flex w-full h-full flex-grow flex-col items-center mt-5">
            <h2 className="font-extrabold tracking-tight sm:text-[2rem]">Albums</h2>
            <div className="flex flex-1 flex-wrap justify-evenly w-full">
              {album.map((data: any) => (
                <Link href={"/web/img/" + data.id} key={data.id} className="flex flex-col justify-center min-w-64 m-5 p-5 bg-muted rounded-lg items-center shadow-md shadow-muted/70">
                  {
                    data.img
                      ?
                      <>
                        <div className="flex items-center justify-center w-64 h-64">
                          <img className="max-h-64 max-w-64 rounded-md shadow-md shadow-background/70" src={data.img} alt={data.title} />
                        </div>
                        <span className="bg-background mt-3 px-2.5 py-0.5 rounded-xlg shadow-md shadow-background/70">{data.title}</span>
                      </>
                      :
                      <div className="flex items-center justify-center w-64 h-64">
                        <span className="bg-background px-2.5 py-0.5 rounded-xlg shadow-md shadow-background/70">{data.title}</span>
                      </div>
                  }
                </Link>
              ))}
            </div>
          </div>
        :
        <></>
      }
    </div>
  )
}

async function Img(props: any) {
  let slug = props.props.gallery

  let img = []

  if (slug) {
    let slugNum: number = +slug;
    img = await getImg(slugNum);
  } else {
    img = await getImg(NaN);
  }

  return (
    <div className="flex w-full h-full flex-grow flex-col items-center">
      {
        img[0] ?
          <div className="flex w-full h-full flex-grow flex-col items-center mt-5">
            <h2 className="font-extrabold tracking-tight sm:text-[2rem]">Images</h2>
            <div className="flex flex-1 flex-wrap justify-evenly w-full">
              {img.map((data: any) => (
                <Link href={data.img} key={data.id} className="flex flex-col align-middle m-5 p-5 bg-muted rounded-lg items-center shadow-md shadow-muted/70">
                  {
                    data.img
                      ?
                      <>
                        <div className="flex items-center justify-center w-72 h-72">
                          <img className="max-h-72 max-w-72 rounded-md shadow-md shadow-background/70" src={data.img} alt={data.title} />
                        </div>
                        <span className="bg-background mt-3 px-2.5 py-0.5 rounded-xlg shadow-md shadow-background/70">{data.title}</span>
                      </>
                      :
                      <div className="flex items-center justify-center w-72 h-72">
                        <span className="bg-background px-2.5 py-0.5 rounded-xlg shadow-md shadow-background/70">{data.title}</span>
                      </div>
                  }
                </Link>
              ))}
            </div>
          </div>
          :
          <></>
      }
    </div>
  )
}

export default async function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="flex w-full h-full flex-grow flex-col items-center mt-5">
      <h1 className="font-extrabold tracking-tight sm:text-[3rem]">Gallery</h1>
      <Separator className="my-4 w-10/12" />

      <div className="flex flex-col w-4/5">
        <Album props={params} />
        <Img props={params} />
      </div>
    </main>
  );
};