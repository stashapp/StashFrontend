import { Studio } from './studio.model';
import { Gallery } from './gallery.model';
import { Performer } from './performer.model';
import { Tag } from './tag.model';

export class SceneMarker {
  id?: any;
  title?: string;
  seconds?: number;
  stream?: string;
  preview?: string;

  scene?: {
    id: string;
  };

  primary_tag?: {
    id: string;
    name: string;
  };

  tags?: {
    id: string;
    name: string;
  }[];
}

export class SceneMarkerTag {
  tag: Tag;
  scene_markers: SceneMarker[];
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
  };

  paths: {
    screenshot?: string;
    preview?: string;
    stream?: string;
    webp?: string;
    vtt?: string;
    chapters_vtt?: string;
  };
  is_streamable?: boolean;

  scene_markers: SceneMarker[];
  scene_marker_tags?: SceneMarkerTag[];
  gallery: Gallery;
  studio: Studio;
  tags: Tag[];
  performers: Performer[];
}
