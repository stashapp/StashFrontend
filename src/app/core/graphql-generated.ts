/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface FindFilterType {
  q?: string | null,
  page?: number | null,
  per_page?: number | null,
  sort?: string | null,
  direction?: SortDirectionEnum | null,
};

// Valid sort directions
export enum SortDirectionEnum {
  ASC = "ASC", // Ascending order
  DESC = "DESC", // Descending order
}


export interface SceneFilterType {
  // Filter by rating
  rating?: number | null,
  // Filter by resolution
  resolution?: ResolutionEnum | null,
  // Filter to only include scenes which have markers. `true` or `false`
  has_markers?: string | null,
  // Filter to only include scenes missing this property
  is_missing?: string | null,
  // Filter to only include scenes with this studio
  studio_id?: string | null,
  // Filter to only include scenes with this tag
  tag_id?: string | null,
  // Filter to only include scenes with this performer
  performer_id?: string | null,
};

// Valid resolutions
export enum ResolutionEnum {
  FOUR_K = "FOUR_K", // 4k
  FULL_HD = "FULL_HD", // 1080p
  LOW = "LOW", // 240p
  STANDARD = "STANDARD", // 480p
  STANDARD_HD = "STANDARD_HD", // 720p
}


export interface PerformerFilterType {
  // Filter by favorite
  filter_favorites?: boolean | null,
};

export interface FindScenesQueryVariables {
  filter?: FindFilterType | null,
  scene_filter?: SceneFilterType | null,
  scene_ids?: Array< number | null > | null,
};

export interface FindScenesQuery {
  // A function which queries Scene objects
  findScenes:  {
    count: number,
    scenes:  Array< {
      id: string,
      checksum: string,
      title: string | null,
      details: string | null,
      url: string | null,
      date: string | null,
      rating: number | null,
      path: string,
      file:  {
        size: string | null,
        duration: number | null,
        video_codec: string | null,
        audio_codec: string | null,
        width: number | null,
        height: number | null,
      },
      paths:  {
        screenshot: string | null,
        preview: string | null,
        stream: string | null,
        webp: string | null,
        vtt: string | null,
        chapters_vtt: string | null,
      },
      scene_markers:  Array< {
        id: string,
        title: string,
        seconds: number,
      } | null >,
      gallery:  {
        id: string,
        path: string,
        title: string | null,
      } | null,
      studio:  {
        id: string,
        name: string,
        image_path: string | null,
      } | null,
      tags:  Array< {
        id: string,
        name: string,
      } | null >,
      performers:  Array< {
        id: string,
        name: string | null,
        image_path: string | null,
      } | null >,
    } | null >,
  },
};

export interface FindSceneQueryVariables {
  id?: string | null,
  checksum?: string | null,
};

export interface FindSceneQuery {
  // Find a scene by ID or Checksum
  findScene:  {
    id: string,
    checksum: string,
    title: string | null,
    details: string | null,
    url: string | null,
    date: string | null,
    rating: number | null,
    path: string,
    file:  {
      size: string | null,
      duration: number | null,
      video_codec: string | null,
      audio_codec: string | null,
      width: number | null,
      height: number | null,
    },
    paths:  {
      screenshot: string | null,
      preview: string | null,
      stream: string | null,
      webp: string | null,
      vtt: string | null,
      chapters_vtt: string | null,
    },
    scene_markers:  Array< {
      id: string,
      title: string,
      seconds: number,
      // The path to stream this marker
      stream: string,
      // The path to the preview image for this marker
      preview: string,
      scene:  {
        id: string,
      },
    } | null >,
    is_streamable: boolean,
    gallery:  {
      id: string,
      checksum: string,
      path: string,
      title: string | null,
      // The files in the gallery
      files:  Array< {
        index: number,
        name: string | null,
        path: string | null,
      } | null >,
    } | null,
    studio:  {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null,
    tags:  Array< {
      id: string,
      name: string,
      scene_count: number | null,
    } | null >,
    performers:  Array< {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null >,
  } | null,
};

export interface FindSceneForEditingQueryVariables {
  id?: string | null,
};

export interface FindSceneForEditingQuery {
  // Find a scene by ID or Checksum
  findScene:  {
    id: string,
    checksum: string,
    title: string | null,
    details: string | null,
    url: string | null,
    date: string | null,
    rating: number | null,
    path: string,
    file:  {
      size: string | null,
      duration: number | null,
      video_codec: string | null,
      audio_codec: string | null,
      width: number | null,
      height: number | null,
    },
    paths:  {
      screenshot: string | null,
      preview: string | null,
      stream: string | null,
      webp: string | null,
      vtt: string | null,
      chapters_vtt: string | null,
    },
    scene_markers:  Array< {
      id: string,
      title: string,
      seconds: number,
      // The path to stream this marker
      stream: string,
      // The path to the preview image for this marker
      preview: string,
      scene:  {
        id: string,
      },
    } | null >,
    is_streamable: boolean,
    gallery:  {
      id: string,
      checksum: string,
      path: string,
      title: string | null,
      // The files in the gallery
      files:  Array< {
        index: number,
        name: string | null,
        path: string | null,
      } | null >,
    } | null,
    studio:  {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null,
    tags:  Array< {
      id: string,
      name: string,
      scene_count: number | null,
    } | null >,
    performers:  Array< {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null >,
  } | null,
  allPerformers:  Array< {
    id: string,
    name: string | null,
    birthdate: string | null,
    image_path: string | null,
  } | null >,
  allTags:  Array< {
    id: string,
    name: string,
  } | null >,
  allStudios:  Array< {
    id: string,
    name: string,
  } | null >,
  // Get the list of valid galleries for a given scene ID
  validGalleriesForScene:  Array< {
    id: string,
    path: string,
  } | null >,
};

export interface SceneWallQueryVariables {
  q?: string | null,
};

export interface SceneWallQuery {
  // Retrieve random scenes for the wall
  sceneWall:  Array< {
    id: string,
    checksum: string,
    title: string | null,
    details: string | null,
    url: string | null,
    date: string | null,
    rating: number | null,
    path: string,
    file:  {
      size: string | null,
      duration: number | null,
      video_codec: string | null,
      audio_codec: string | null,
      width: number | null,
      height: number | null,
    },
    paths:  {
      screenshot: string | null,
      preview: string | null,
      stream: string | null,
      webp: string | null,
      vtt: string | null,
      chapters_vtt: string | null,
    },
    scene_markers:  Array< {
      id: string,
      title: string,
      seconds: number,
      // The path to stream this marker
      stream: string,
      // The path to the preview image for this marker
      preview: string,
      scene:  {
        id: string,
      },
    } | null >,
    is_streamable: boolean,
    gallery:  {
      id: string,
      checksum: string,
      path: string,
      title: string | null,
      // The files in the gallery
      files:  Array< {
        index: number,
        name: string | null,
        path: string | null,
      } | null >,
    } | null,
    studio:  {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null,
    tags:  Array< {
      id: string,
      name: string,
      scene_count: number | null,
    } | null >,
    performers:  Array< {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null >,
  } | null >,
};

export interface MarkerWallQueryVariables {
  q?: string | null,
};

export interface MarkerWallQuery {
  // Retrieve random scene markers for the wall
  markerWall:  Array< {
    id: string,
    title: string,
    seconds: number,
    // The path to stream this marker
    stream: string,
    // The path to the preview image for this marker
    preview: string,
    scene:  {
      id: string,
    },
  } | null >,
};

export interface FindPerformersQueryVariables {
  filter?: FindFilterType | null,
  performer_filter?: PerformerFilterType | null,
};

export interface FindPerformersQuery {
  // A function which queries Performer objects
  findPerformers:  {
    count: number,
    performers:  Array< {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null >,
  },
};

export interface FindPerformerQueryVariables {
  id: string,
};

export interface FindPerformerQuery {
  // Find a performer by ID
  findPerformer:  {
    id: string,
    checksum: string,
    name: string | null,
    url: string | null,
    twitter: string | null,
    instagram: string | null,
    birthdate: string | null,
    ethnicity: string | null,
    country: string | null,
    eye_color: string | null,
    height: string | null,
    measurements: string | null,
    fake_tits: string | null,
    career_length: string | null,
    tattoos: string | null,
    piercings: string | null,
    aliases: string | null,
    favorite: boolean,
    image_path: string | null,
    scene_count: number | null,
  } | null,
};

export interface FindStudiosQueryVariables {
  filter?: FindFilterType | null,
};

export interface FindStudiosQuery {
  // A function which queries Studio objects
  findStudios:  {
    count: number,
    studios:  Array< {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null >,
  },
};

export interface FindStudioQueryVariables {
  id: string,
};

export interface FindStudioQuery {
  // Find a studio by ID
  findStudio:  {
    id: string,
    checksum: string,
    name: string,
    url: string | null,
    image_path: string | null,
    scene_count: number | null,
  } | null,
};

export interface FindGalleriesQueryVariables {
  filter?: FindFilterType | null,
};

export interface FindGalleriesQuery {
  // A function which queries Gallery objects
  findGalleries:  {
    count: number,
    galleries:  Array< {
      id: string,
      checksum: string,
      path: string,
      title: string | null,
      // The files in the gallery
      files:  Array< {
        index: number,
        name: string | null,
        path: string | null,
      } | null >,
    } | null >,
  },
};

export interface FindGalleryQueryVariables {
  id: string,
};

export interface FindGalleryQuery {
  // Find a gallery by ID
  findGallery:  {
    id: string,
    checksum: string,
    path: string,
    title: string | null,
    // The files in the gallery
    files:  Array< {
      index: number,
      name: string | null,
      path: string | null,
    } | null >,
  } | null,
};

export interface MarkerStringsQueryVariables {
  q?: string | null,
  sort?: string | null,
};

export interface MarkerStringsQuery {
  // Get marker strings
  markerStrings:  Array< {
    id: string,
    count: number,
    title: string,
  } | null >,
};

export interface AllPerformersQuery {
  allPerformers:  Array< {
    id: string,
    checksum: string,
    name: string | null,
    url: string | null,
    twitter: string | null,
    instagram: string | null,
    birthdate: string | null,
    ethnicity: string | null,
    country: string | null,
    eye_color: string | null,
    height: string | null,
    measurements: string | null,
    fake_tits: string | null,
    career_length: string | null,
    tattoos: string | null,
    piercings: string | null,
    aliases: string | null,
    favorite: boolean,
    image_path: string | null,
    scene_count: number | null,
  } | null >,
};

export interface AllStudiosQuery {
  allStudios:  Array< {
    id: string,
    checksum: string,
    name: string,
    url: string | null,
    image_path: string | null,
    scene_count: number | null,
  } | null >,
};

export interface AllTagsQuery {
  allTags:  Array< {
    id: string,
    name: string,
    scene_count: number | null,
  } | null >,
};

export interface StatsQuery {
  // Get stats
  stats:  {
    scene_count: number,
    gallery_count: number,
    performer_count: number,
    studio_count: number,
    tag_count: number,
  },
};

export interface SceneUpdateMutationVariables {
  id: string,
  title?: string | null,
  details?: string | null,
  url?: string | null,
  date?: string | null,
  rating?: number | null,
  studio_id?: string | null,
  gallery_id?: string | null,
  performer_ids?: Array< string | null > | null,
  tag_ids?: Array< string | null > | null,
};

export interface SceneUpdateMutation {
  sceneUpdate:  {
    scene:  {
      id: string,
      checksum: string,
      title: string | null,
      details: string | null,
      url: string | null,
      date: string | null,
      rating: number | null,
      path: string,
      file:  {
        size: string | null,
        duration: number | null,
        video_codec: string | null,
        audio_codec: string | null,
        width: number | null,
        height: number | null,
      },
      paths:  {
        screenshot: string | null,
        preview: string | null,
        stream: string | null,
        webp: string | null,
        vtt: string | null,
        chapters_vtt: string | null,
      },
      scene_markers:  Array< {
        id: string,
        title: string,
        seconds: number,
        // The path to stream this marker
        stream: string,
        // The path to the preview image for this marker
        preview: string,
        scene:  {
          id: string,
        },
      } | null >,
      is_streamable: boolean,
      gallery:  {
        id: string,
        checksum: string,
        path: string,
        title: string | null,
        // The files in the gallery
        files:  Array< {
          index: number,
          name: string | null,
          path: string | null,
        } | null >,
      } | null,
      studio:  {
        id: string,
        checksum: string,
        name: string,
        url: string | null,
        image_path: string | null,
        scene_count: number | null,
      } | null,
      tags:  Array< {
        id: string,
        name: string,
        scene_count: number | null,
      } | null >,
      performers:  Array< {
        id: string,
        checksum: string,
        name: string | null,
        url: string | null,
        twitter: string | null,
        instagram: string | null,
        birthdate: string | null,
        ethnicity: string | null,
        country: string | null,
        eye_color: string | null,
        height: string | null,
        measurements: string | null,
        fake_tits: string | null,
        career_length: string | null,
        tattoos: string | null,
        piercings: string | null,
        aliases: string | null,
        favorite: boolean,
        image_path: string | null,
        scene_count: number | null,
      } | null >,
    } | null,
  } | null,
};

export interface PerformerCreateMutationVariables {
  name?: string | null,
  url?: string | null,
  birthdate?: string | null,
  ethnicity?: string | null,
  country?: string | null,
  eye_color?: string | null,
  height?: string | null,
  measurements?: string | null,
  fake_tits?: string | null,
  career_length?: string | null,
  tattoos?: string | null,
  piercings?: string | null,
  aliases?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  favorite?: boolean | null,
  image: string,
};

export interface PerformerCreateMutation {
  performerCreate:  {
    performer:  {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null,
  } | null,
};

export interface PerformerUpdateMutationVariables {
  id: string,
  name?: string | null,
  url?: string | null,
  birthdate?: string | null,
  ethnicity?: string | null,
  country?: string | null,
  eye_color?: string | null,
  height?: string | null,
  measurements?: string | null,
  fake_tits?: string | null,
  career_length?: string | null,
  tattoos?: string | null,
  piercings?: string | null,
  aliases?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  favorite?: boolean | null,
  image?: string | null,
};

export interface PerformerUpdateMutation {
  performerUpdate:  {
    performer:  {
      id: string,
      checksum: string,
      name: string | null,
      url: string | null,
      twitter: string | null,
      instagram: string | null,
      birthdate: string | null,
      ethnicity: string | null,
      country: string | null,
      eye_color: string | null,
      height: string | null,
      measurements: string | null,
      fake_tits: string | null,
      career_length: string | null,
      tattoos: string | null,
      piercings: string | null,
      aliases: string | null,
      favorite: boolean,
      image_path: string | null,
      scene_count: number | null,
    } | null,
  } | null,
};

export interface StudioCreateMutationVariables {
  name: string,
  url?: string | null,
  image: string,
};

export interface StudioCreateMutation {
  studioCreate:  {
    studio:  {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null,
  } | null,
};

export interface StudioUpdateMutationVariables {
  id: string,
  name?: string | null,
  url?: string | null,
  image?: string | null,
};

export interface StudioUpdateMutation {
  studioUpdate:  {
    studio:  {
      id: string,
      checksum: string,
      name: string,
      url: string | null,
      image_path: string | null,
      scene_count: number | null,
    } | null,
  } | null,
};

export interface TagCreateMutationVariables {
  name: string,
};

export interface TagCreateMutation {
  tagCreate:  {
    tag:  {
      id: string,
      name: string,
      scene_count: number | null,
    } | null,
  } | null,
};

export interface SceneMarkerCreateMutationVariables {
  title: string,
  seconds: number,
  scene_id: string,
};

export interface SceneMarkerCreateMutation {
  sceneMarkerCreate:  {
    id: string,
    seconds: number,
    title: string,
    // The path to stream this marker
    stream: string,
    // The path to the preview image for this marker
    preview: string,
  } | null,
};

export interface SceneMarkerDestroyMutationVariables {
  id: string,
};

export interface SceneMarkerDestroyMutation {
  sceneMarkerDestroy: boolean,
};

export interface SceneMarkerDataFragment {
  id: string,
  title: string,
  seconds: number,
  // The path to stream this marker
  stream: string,
  // The path to the preview image for this marker
  preview: string,
  scene:  {
    id: string,
  },
};

export interface StudioDataFragment {
  id: string,
  checksum: string,
  name: string,
  url: string | null,
  image_path: string | null,
  scene_count: number | null,
};

export interface PerformerDataFragment {
  id: string,
  checksum: string,
  name: string | null,
  url: string | null,
  twitter: string | null,
  instagram: string | null,
  birthdate: string | null,
  ethnicity: string | null,
  country: string | null,
  eye_color: string | null,
  height: string | null,
  measurements: string | null,
  fake_tits: string | null,
  career_length: string | null,
  tattoos: string | null,
  piercings: string | null,
  aliases: string | null,
  favorite: boolean,
  image_path: string | null,
  scene_count: number | null,
};

export interface TagDataFragment {
  id: string,
  name: string,
  scene_count: number | null,
};

export interface GalleryDataFragment {
  id: string,
  checksum: string,
  path: string,
  title: string | null,
  // The files in the gallery
  files:  Array< {
    index: number,
    name: string | null,
    path: string | null,
  } | null >,
};

export interface SceneDataFragment {
  id: string,
  checksum: string,
  title: string | null,
  details: string | null,
  url: string | null,
  date: string | null,
  rating: number | null,
  path: string,
  file:  {
    size: string | null,
    duration: number | null,
    video_codec: string | null,
    audio_codec: string | null,
    width: number | null,
    height: number | null,
  },
  paths:  {
    screenshot: string | null,
    preview: string | null,
    stream: string | null,
    webp: string | null,
    vtt: string | null,
    chapters_vtt: string | null,
  },
  scene_markers:  Array< {
    id: string,
    title: string,
    seconds: number,
    // The path to stream this marker
    stream: string,
    // The path to the preview image for this marker
    preview: string,
    scene:  {
      id: string,
    },
  } | null >,
  is_streamable: boolean,
  gallery:  {
    id: string,
    checksum: string,
    path: string,
    title: string | null,
    // The files in the gallery
    files:  Array< {
      index: number,
      name: string | null,
      path: string | null,
    } | null >,
  } | null,
  studio:  {
    id: string,
    checksum: string,
    name: string,
    url: string | null,
    image_path: string | null,
    scene_count: number | null,
  } | null,
  tags:  Array< {
    id: string,
    name: string,
    scene_count: number | null,
  } | null >,
  performers:  Array< {
    id: string,
    checksum: string,
    name: string | null,
    url: string | null,
    twitter: string | null,
    instagram: string | null,
    birthdate: string | null,
    ethnicity: string | null,
    country: string | null,
    eye_color: string | null,
    height: string | null,
    measurements: string | null,
    fake_tits: string | null,
    career_length: string | null,
    tattoos: string | null,
    piercings: string | null,
    aliases: string | null,
    favorite: boolean,
    image_path: string | null,
    scene_count: number | null,
  } | null >,
};

export interface SlimSceneDataFragment {
  id: string,
  checksum: string,
  title: string | null,
  details: string | null,
  url: string | null,
  date: string | null,
  rating: number | null,
  path: string,
  file:  {
    size: string | null,
    duration: number | null,
    video_codec: string | null,
    audio_codec: string | null,
    width: number | null,
    height: number | null,
  },
  paths:  {
    screenshot: string | null,
    preview: string | null,
    stream: string | null,
    webp: string | null,
    vtt: string | null,
    chapters_vtt: string | null,
  },
  scene_markers:  Array< {
    id: string,
    title: string,
    seconds: number,
  } | null >,
  gallery:  {
    id: string,
    path: string,
    title: string | null,
  } | null,
  studio:  {
    id: string,
    name: string,
    image_path: string | null,
  } | null,
  tags:  Array< {
    id: string,
    name: string,
  } | null >,
  performers:  Array< {
    id: string,
    name: string | null,
    image_path: string | null,
  } | null >,
};
