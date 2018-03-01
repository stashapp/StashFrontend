import { Studio } from './studio.model';
import { Gallery } from './gallery.model';
import { Performer } from './performer.model';
import { Tag } from './tag.model';

export class SceneMarker {
  id: any;
  title: string;
  seconds: number;
  stream: string;
  preview: string;

  scene: {
    id: string;
  }
}

export class SceneSpriteItem {
  start: number;
  end: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export class Scene {
  id: any;
  checksum: string;
  path: string;
  title?: string;
  details?: string;
  url?: string;
  date?: string;
  rating?: number;

  file: {
    size: string;
    duration: number;
    video_codec: string;
    audio_codec: string;
    width: number;
    height: number;
  }

  paths: {
    screenshot?: string;
    preview?: string;
    stream?: string;
    webp?: string;
    vtt?: string;
    chapters_vtt?: string;
  }
  is_streamable?: boolean;

  scene_markers: SceneMarker[];
  studio: Studio
  tags: Tag[];
  performers: Performer[];

  // studio_id?: number;
  // gallery_id?: number;
  // tag_ids: number[];
  // performer_ids: number[];
}
