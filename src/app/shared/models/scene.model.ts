import { Studio } from './studio.model';
import { Gallery } from './gallery.model';
import { Performer } from './performer.model';
import { Tag } from './tag.model';

export class SceneMarker {
    id: number;
    scene_id: number;
    title: string;
    seconds: number;
}

export class Scene {
  id: number;
  checksum: string;
  path: string;
  title?: string;
  details?: string;
  url?: string;
  date?: string;
  rating?: number;

  file: {
    size?: string;
    duration?: string;
    video_codec?: string;
    audio_codec?: string;
    width?: number;
    height?: number;
  }

  paths: {
    screenshot?: string;
    preview?: string;
    stream?: string;
    vtt?: string;
    chapters_vtt?: string;
  }
  is_streamable?: boolean;

  scene_markers: SceneMarker[];

  studio_id?: number;
  gallery_id?: number;
  tag_ids: number[];
  performer_ids: number[];

  fetchedPerformers?: Performer[];
  fetchedTags?: Tag[];
  fetchedGallery?: Gallery;
  fetchedStudio?: Studio;
}
