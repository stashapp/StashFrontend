import { Scene, SceneMarker } from '../shared/models/scene.model';

import gql from 'graphql-tag';

// - Fragments

export const Fragment_SceneMarkerData = gql`
  fragment SceneMarkerData on SceneMarker {
    id
    title
    seconds
    stream
    preview

    scene {
      id
    }

    primary_tag {
      id
      name
    }

    tags {
      id
      name
    }
  }
`;

export const Fragment_StudioData = gql`
  fragment StudioData on Studio {
    id
    checksum
    name
    url
    image_path
    scene_count
  }
`;

export const Fragment_PerformerData = gql`
  fragment PerformerData on Performer {
    id
    checksum
    name
    url
    twitter
    instagram
    birthdate
    ethnicity
    country
    eye_color
    height
    measurements
    fake_tits
    career_length
    tattoos
    piercings
    aliases
    favorite
    image_path
    scene_count
  }
`;

export const Fragment_TagData = gql`
  fragment TagData on Tag {
    id
    name
    scene_count
    scene_marker_count
  }
`;

export const Fragment_GalleryData = gql`
  fragment GalleryData on Gallery {
    id
    checksum
    path
    title
    files {
      index
      name
      path
    }
  }
`;

export const Fragment_SceneData = gql`
  ${Fragment_SceneMarkerData}
  ${Fragment_StudioData}
  ${Fragment_TagData}
  ${Fragment_PerformerData}
  ${Fragment_GalleryData}

  fragment SceneData on Scene {
    id
    checksum
    title
    details
    url
    date
    rating
    path

    file {
      size
      duration
      video_codec
      audio_codec
      width
      height
    }

    paths {
      screenshot
      preview
      stream
      webp
      vtt
      chapters_vtt
    }

    scene_markers {
      ...SceneMarkerData
    }

    # TODO: Remove this
    scene_marker_tags {
      tag {
        id
        name
      }
      scene_markers {
        ...SceneMarkerData
      }
    }

    is_streamable

    gallery {
      ...GalleryData
    }

    studio {
      ...StudioData
    }

    tags {
      ...TagData
    }

    performers {
      ...PerformerData
    }
  }
`;

export const Fragment_SlimSceneData = gql`
  fragment SlimSceneData on Scene {
    id
    checksum
    title
    details
    url
    date
    rating
    path

    file {
      size
      duration
      video_codec
      audio_codec
      width
      height
    }

    paths {
      screenshot
      preview
      stream
      webp
      vtt
      chapters_vtt
    }

    scene_markers {
      id
      title
      seconds
    }

    gallery {
      id
      path
      title
    }

    studio {
      id
      name
      image_path
    }

    tags {
      id
      name
    }

    performers {
      id
      name
      favorite
      image_path
    }
  }
`;



// - Querys

export const FIND_SCENES = gql`
  ${Fragment_SlimSceneData}

  query FindScenes($filter: FindFilterType, $scene_filter: SceneFilterType, $scene_ids: [Int]) {
    findScenes(filter: $filter, scene_filter: $scene_filter, scene_ids: $scene_ids) {
      count
      scenes {
        ...SlimSceneData
      }
    }
  }
`;

export const FIND_SCENE = gql`
  ${Fragment_SceneData}
  ${Fragment_SceneMarkerData}

  query FindScene($id: ID, $checksum: String) {
    findScene(id: $id, checksum: $checksum) {
      ...SceneData
    }

    sceneMarkerTags(scene_id: $id) {
      tag {
        id
        name
      }
      scene_markers {
        ...SceneMarkerData
      }
    }
  }
`;

export const FIND_SCENE_FOR_EDITING = gql`
  ${Fragment_SceneData}
  ${Fragment_PerformerData}

  query FindSceneForEditing($id: ID) {
    findScene(id: $id) {
      ...SceneData
    }

    allPerformers {
      id
      name
      birthdate
      image_path
    }

    allTags {
      id
      name
    }

    allStudios {
      id
      name
    }

    validGalleriesForScene(scene_id: $id) {
      id
      path
    }
  }
`;

export const FIND_SCENE_MARKERS = gql`
  ${Fragment_SceneMarkerData}

  query FindSceneMarkers($filter: FindFilterType, $scene_marker_filter: SceneMarkerFilterType) {
    findSceneMarkers(filter: $filter, scene_marker_filter: $scene_marker_filter) {
      count
      scene_markers {
        ...SceneMarkerData
      }
    }
  }
`;

export const SCENE_WALL = gql`
  ${Fragment_SceneData}

  query SceneWall($q: String) {
    sceneWall(q: $q) {
      ...SceneData
    }
  }
`;

export const MARKER_WALL = gql`
  ${Fragment_SceneMarkerData}

  query MarkerWall($q: String) {
    markerWall(q: $q) {
      ...SceneMarkerData
    }
  }
`;

export const FIND_PERFORMERS = gql`
  ${Fragment_PerformerData}

  query FindPerformers($filter: FindFilterType, $performer_filter: PerformerFilterType) {
    findPerformers(filter: $filter, performer_filter: $performer_filter) {
      count
      performers {
        ...PerformerData
      }
    }
  }
`;

export const FIND_PERFORMER = gql`
  ${Fragment_PerformerData}

  query FindPerformer($id: ID!) {
    findPerformer(id: $id) {
      ...PerformerData
    }
  }
`;

export const FIND_STUDIOS = gql`
  ${Fragment_StudioData}

  query FindStudios($filter: FindFilterType) {
    findStudios(filter: $filter) {
      count
      studios {
        ...StudioData
      }
    }
  }
`;

export const FIND_STUDIO = gql`
  ${Fragment_StudioData}

  query FindStudio($id: ID!) {
    findStudio(id: $id) {
      ...StudioData
    }
  }
`;

export const FIND_GALLERIES = gql`
  ${Fragment_GalleryData}

  query FindGalleries($filter: FindFilterType) {
    findGalleries(filter: $filter) {
      count
      galleries {
        ...GalleryData
      }
    }
  }
`;

export const FIND_GALLERY = gql`
  ${Fragment_GalleryData}

  query FindGallery($id: ID!) {
    findGallery(id: $id) {
      ...GalleryData
    }
  }
`;

export const FIND_TAG = gql`
  ${Fragment_TagData}

  query FindTag($id: ID!) {
    findTag(id: $id) {
      ...TagData
    }
  }
`;

export const MARKER_STRINGS = gql`
  query MarkerStrings($q: String, $sort: String) {
    markerStrings(q: $q, sort: $sort) {
      id
      count
      title
    }
  }
`;

export const SCRAPE_FREEONES = gql`
  query ScrapeFreeones($performer_name: String!) {
    scrapeFreeones(performer_name: $performer_name) {
      name
      url
      twitter
      instagram
      birthdate
      ethnicity
      country
      eye_color
      height
      measurements
      fake_tits
      career_length
      tattoos
      piercings
      aliases
    }
  }
`;

export const SCRAPE_FREEONES_PERFORMERS = gql`
  query ScrapeFreeonesPerformers($q: String!) {
    scrapeFreeonesPerformerList(query: $q)
  }
`;

export const ALL_PERFORMERS = gql`
  ${Fragment_PerformerData}

  query AllPerformers {
    allPerformers {
      ...PerformerData
    }
  }
`;

export const ALL_STUDIOS = gql`
  ${Fragment_StudioData}

  query AllStudios {
    allStudios {
      ...StudioData
    }
  }
`;

export const ALL_TAGS = gql`
  ${Fragment_TagData}

  query AllTags {
    allTags {
      ...TagData
    }
  }
`;

export const ALL_SCENE_MARKERS = gql`
  ${Fragment_SceneMarkerData}

  query AllSceneMarkers {
    allSceneMarkers {
      ...SceneMarkerData
    }
  }
`;

export const STATS = gql`
  query Stats {
    stats {
      scene_count,
      gallery_count,
      performer_count,
      studio_count,
      tag_count
    }
  }
`;

// - Mutations

export const SCENE_UPDATE = gql`
  ${Fragment_SceneData}

  mutation SceneUpdate(
    $id: ID!,
    $title: String,
    $details: String,
    $url: String,
    $date: String,
    $rating: Int,
    $studio_id: ID,
    $gallery_id: ID,
    $performer_ids: [ID] = [],
    $tag_ids: [ID] = []) {

    sceneUpdate(input: {
                          id: $id,
                          title: $title,
                          details: $details,
                          url: $url,
                          date: $date,
                          rating: $rating,
                          studio_id: $studio_id,
                          gallery_id: $gallery_id,
                          performer_ids: $performer_ids,
                          tag_ids: $tag_ids
                        }) {
      scene {
        ...SceneData
      }
    }
  }
`;


export const PERFORMER_CREATE = gql`
  ${Fragment_PerformerData}

  mutation PerformerCreate(
    $name: String,
    $url: String,
    $birthdate: String,
    $ethnicity: String,
    $country: String,
    $eye_color: String,
    $height: String,
    $measurements: String,
    $fake_tits: String,
    $career_length: String,
    $tattoos: String,
    $piercings: String,
    $aliases: String,
    $twitter: String,
    $instagram: String,
    $favorite: Boolean,
    $image: String!) {

    performerCreate(input: {
                              name: $name,
                              url: $url,
                              birthdate: $birthdate,
                              ethnicity: $ethnicity,
                              country: $country,
                              eye_color: $eye_color,
                              height: $height,
                              measurements: $measurements,
                              fake_tits: $fake_tits,
                              career_length: $career_length,
                              tattoos: $tattoos,
                              piercings: $piercings,
                              aliases: $aliases,
                              twitter: $twitter,
                              instagram: $instagram,
                              favorite: $favorite,
                              image: $image
                            }) {
      performer {
        ...PerformerData
      }
    }
  }
`;

export const PERFORMER_UPDATE = gql`
  ${Fragment_PerformerData}

  mutation PerformerUpdate(
    $id: ID!,
    $name: String,
    $url: String,
    $birthdate: String,
    $ethnicity: String,
    $country: String,
    $eye_color: String,
    $height: String,
    $measurements: String,
    $fake_tits: String,
    $career_length: String,
    $tattoos: String,
    $piercings: String,
    $aliases: String,
    $twitter: String,
    $instagram: String,
    $favorite: Boolean,
    $image: String) {

    performerUpdate(input: {
                              id: $id,
                              name: $name,
                              url: $url,
                              birthdate: $birthdate,
                              ethnicity: $ethnicity,
                              country: $country,
                              eye_color: $eye_color,
                              height: $height,
                              measurements: $measurements,
                              fake_tits: $fake_tits,
                              career_length: $career_length,
                              tattoos: $tattoos,
                              piercings: $piercings,
                              aliases: $aliases,
                              twitter: $twitter,
                              instagram: $instagram,
                              favorite: $favorite,
                              image: $image
                            }) {
      performer {
        ...PerformerData
      }
    }
  }
`;

export const STUDIO_CREATE = gql`
  ${Fragment_StudioData}

  mutation StudioCreate(
    $name: String!,
    $url: String,
    $image: String!) {

    studioCreate(input: { name: $name, url: $url, image: $image }) {
      studio {
        ...StudioData
      }
    }
  }
`;

export const STUDIO_UPDATE = gql`
  ${Fragment_StudioData}

  mutation StudioUpdate(
    $id: ID!
    $name: String,
    $url: String,
    $image: String) {

    studioUpdate(input: { id: $id, name: $name, url: $url, image: $image }) {
      studio {
        ...StudioData
      }
    }
  }
`;

export const TAG_CREATE = gql`
  ${Fragment_TagData}

  mutation TagCreate($name: String!) {

    tagCreate(input: { name: $name }) {
      tag {
        ...TagData
      }
    }
  }
`;

export const MARKER_CREATE = gql`
  ${Fragment_SceneMarkerData}

  mutation SceneMarkerCreate(
    $title: String!,
    $seconds: Float!,
    $scene_id: ID!,
    $primary_tag_id: ID!,
    $tag_ids: [ID] = []) {

    sceneMarkerCreate(input: {
                                title: $title,
                                seconds: $seconds,
                                scene_id: $scene_id,
                                primary_tag_id: $primary_tag_id,
                                tag_ids: $tag_ids
                              }) {
      scene_marker {
        ...SceneMarkerData
      }
    }
  }
`;

export const MARKER_UPDATE = gql`
  ${Fragment_SceneMarkerData}

  mutation SceneMarkerUpdate(
    $id: ID!,
    $title: String!,
    $seconds: Float!,
    $scene_id: ID!,
    $primary_tag_id: ID!,
    $tag_ids: [ID] = []) {

    sceneMarkerUpdate(input: {
                                id: $id,
                                title: $title,
                                seconds: $seconds,
                                scene_id: $scene_id,
                                primary_tag_id: $primary_tag_id,
                                tag_ids: $tag_ids
                              }) {
      scene_marker {
        ...SceneMarkerData
      }
    }
  }
`;

export const MARKER_DESTROY = gql`
  mutation SceneMarkerDestroy($id: ID!) {
    sceneMarkerDestroy(id: $id)
  }
`;

export const METADATA_IMPORT = gql`
  query MetadataImport {
    metadataImport
  }
`;

export const METADATA_EXPORT = gql`
  query MetadataExport {
    metadataExport
  }
`;

export const METADATA_SCAN = gql`
  query MetadataScan {
    metadataScan
  }
`;

export const METADATA_GENERATE = gql`
  query MetadataGenerate {
    metadataGenerate
  }
`;

export const METADATA_CLEAN = gql`
  query MetadataClean {
    metadataClean
  }
`;

export const METADATA_UPDATE_SUBSCRIPTION = gql`
  subscription MetadataUpdate {
    metadataUpdate
  }
`;
