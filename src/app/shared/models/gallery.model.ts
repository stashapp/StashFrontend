export class Gallery {
  id: number;
  checksum: string;
  path: string;
  title: string;
  files: GalleryImage[];
}

export class GalleryImage {
  index: number;
  name: string;
  path: string;
}
