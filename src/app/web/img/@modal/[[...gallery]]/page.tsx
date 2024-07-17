import { Modal } from "./_components/modal";
import { FullPageImageView } from "./_components/full-page-image-view";

export default async function modal({ params }: { params: { gallery: string[] } }) {
  if (!params.gallery) {
    return null;
  };
  
  if (params.gallery[params.gallery.length - 2] === "img") {
    let photoId = params.gallery[params.gallery.length - 1];

    if (!photoId) {
      console.error("lastSlug is not defined");
      return (
        <div>
          <h1>Error</h1>
          <p>lastSlug is not defined</p>
        </div>
      );
    };

    return (
      <Modal>
        <FullPageImageView photoId={photoId} />
      </Modal>
    );
  };
};