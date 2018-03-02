export class Gallery {
  id: any;
  checksum?: string;
  path?: string;
  title?: string;
  files?: GalleryImage[];
}

export class GalleryImage {
  index: number;
  name: string;
  path?: string;
}
