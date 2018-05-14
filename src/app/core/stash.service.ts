import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { ListFilter, CriteriaType, CustomCriteria } from '../shared/models/list-state.model';

import { ApolloModule, Apollo, QueryRef } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';

import * as ActionCable from 'actioncable';
import * as ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import {
  FIND_SCENES,
  FIND_SCENE,
  MARKER_STRINGS,
  MARKER_CREATE,
  MARKER_DESTROY,
  FIND_SCENE_FOR_EDITING,
  FIND_PERFORMER,
  SCENE_WALL,
  MARKER_WALL,
  ALL_TAGS,
  FIND_PERFORMERS,
  FIND_STUDIOS,
  FIND_STUDIO,
  FIND_GALLERIES,
  FIND_GALLERY,
  SCENE_UPDATE,
  PERFORMER_UPDATE,
  PERFORMER_CREATE,
  ALL_PERFORMERS,
  TAG_CREATE,
  STUDIO_CREATE,
  ALL_STUDIOS,
  STUDIO_UPDATE,
  STATS,
  METADATA_UPDATE_SUBSCRIPTION,
  METADATA_SCAN,
  METADATA_EXPORT,
  METADATA_IMPORT,
  METADATA_GENERATE,
  METADATA_CLEAN,
  SCRAPE_FREEONES,
  SCRAPE_FREEONES_PERFORMERS
} from './graphql';
import * as GQL from './graphql-generated';

import { toIdValue } from 'apollo-utilities';

@Injectable()
export class StashService {
  url = 'http://192.168.1.200:4000';

  constructor(private http: HttpClient,
              private platformLocation: PlatformLocation,
              private apollo: Apollo,
              private httpLink: HttpLink) {
    const platform: any = this.platformLocation;
    const url = new URL(platform.location.origin);
    url.port = '4000';
    this.url = url.toString().slice(0, -1);

    // http://graphql-ruby.org/javascript_client/apollo_subscriptions
    const cable = ActionCable.createConsumer(`ws://${platform.location.hostname}:3000/subscriptions`);
    const actionCableLink = new ActionCableLink({cable});

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const httpLinkHandler = httpLink.create({uri: `${this.url}/graphql`});

    const splitLink = ApolloLink.split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      actionCableLink,
      httpLinkHandler
    );

    const link = ApolloLink.from([
      errorLink,
      splitLink
    ]);

    apollo.create({
      link: link,
      cache: new InMemoryCache({
        // dataIdFromObject: o => {
        //   if (o.__typename === "MarkerStringsResultType") {
        //     return `${o.__typename}:${o.title}`
        //   } else {
        //     return `${o.__typename}:${o.id}`
        //   }
        // },

        cacheRedirects: {
          Query: {
            findScene: (rootValue, args, context) => {
              return context.getCacheKey({__typename: 'Scene', id: args.id});
            }
          },
          Mutation: {
            sceneMarkerCreate: (rootValue, args, context) => {
              // return toIdValue(client.dataIdFromObject({__typename: 'SceneMarker', id: args.id}))
              debugger;
              return context.getCacheKey({__typename: 'SceneMarker', id: args.id});
            }
          }
        }
      })
    });
  }

  findScenes(page?: number, filter?: ListFilter): QueryRef<GQL.FindScenesQuery, Record<string, any>> {
    let scene_filter = {};
    if (filter.criteriaFilterOpen && !!filter.criteria.value) {
      scene_filter = filter.criteria.getSceneFilter();
    }
    if (filter.customCriteria) {
      filter.customCriteria.forEach(criteria => {
        scene_filter[criteria.key] = criteria.value;
      });
    }

    return this.apollo.watchQuery<GQL.FindScenesQuery, GQL.FindScenesQueryVariables>({
      query: FIND_SCENES,
      variables: {
        filter: {
          q: filter.searchTerm,
          page: page,
          per_page: filter.itemsPerPage,
          sort: filter.sortBy,
          direction: filter.sortDirection === 'asc' ? GQL.SortDirectionEnum.ASC : GQL.SortDirectionEnum.DESC
        },
        scene_filter: scene_filter
      }
    });
  }

  findScene(id?: any, checksum?: string) {
    return this.apollo.watchQuery<GQL.FindSceneQuery, GQL.FindSceneQueryVariables>({
      query: FIND_SCENE,
      variables: {
        id: id,
        checksum: checksum
      }
    });
  }

  findSceneForEditing(id?: any) {
    return this.apollo.watchQuery<GQL.FindSceneForEditingQuery, GQL.FindSceneForEditingQueryVariables>({
      query: FIND_SCENE_FOR_EDITING,
      variables: {
        id: id
      }
    });
  }

  sceneWall(q?: string) {
    return this.apollo.watchQuery<GQL.SceneWallQuery, GQL.SceneWallQueryVariables>({
      fetchPolicy: 'network-only',
      query: SCENE_WALL,
      variables: {
        q: q
      }
    });
  }

  markerWall(q?: string) {
    return this.apollo.watchQuery<GQL.MarkerWallQuery, GQL.MarkerWallQueryVariables>({
      fetchPolicy: 'network-only',
      query: MARKER_WALL,
      variables: {
        q: q
      }
    });
  }

  findPerformers(page?: number, filter?: ListFilter) {
    let performer_filter = {};
    if (filter.criteriaFilterOpen && !!filter.criteria.value) {
      performer_filter = filter.criteria.getPerformerFilter();
    }
    // if (filter.customCriteria) {
    //   filter.customCriteria.forEach(criteria => {
    //     scene_filter[criteria.key] = criteria.value;
    //   });
    // }

    return this.apollo.watchQuery<GQL.FindPerformersQuery, GQL.FindPerformersQueryVariables>({
      query: FIND_PERFORMERS,
      variables: {
        filter: {
          q: filter.searchTerm,
          page: page,
          per_page: filter.itemsPerPage,
          sort: filter.sortBy,
          direction: filter.sortDirection === 'asc' ? GQL.SortDirectionEnum.ASC : GQL.SortDirectionEnum.DESC
        },
        performer_filter: performer_filter
      }
    });
  }

  findPerformer(id: any) {
    return this.apollo.watchQuery<GQL.FindPerformerQuery, GQL.FindPerformerQueryVariables>({
      query: FIND_PERFORMER,
      variables: {
        id: id
      }
    });
  }

  findStudios(page?: number, filter?: ListFilter) {
    return this.apollo.watchQuery<GQL.FindStudiosQuery, GQL.FindStudiosQueryVariables>({
      query: FIND_STUDIOS,
      variables: {
        filter: {
          q: filter.searchTerm,
          page: page,
          per_page: filter.itemsPerPage,
          sort: filter.sortBy,
          direction: filter.sortDirection === 'asc' ? GQL.SortDirectionEnum.ASC : GQL.SortDirectionEnum.DESC
        }
      }
    });
  }

  findStudio(id: any) {
    return this.apollo.watchQuery<GQL.FindStudioQuery, GQL.FindStudioQueryVariables>({
      query: FIND_STUDIO,
      variables: {
        id: id
      }
    });
  }

  findGalleries(page?: number, filter?: ListFilter) {
    return this.apollo.watchQuery<GQL.FindGalleriesQuery, GQL.FindGalleriesQueryVariables>({
      query: FIND_GALLERIES,
      variables: {
        filter: {
          q: filter.searchTerm,
          page: page,
          per_page: filter.itemsPerPage,
          sort: filter.sortBy,
          direction: filter.sortDirection === 'asc' ? GQL.SortDirectionEnum.ASC : GQL.SortDirectionEnum.DESC
        }
      }
    });
  }

  findGallery(id: any) {
    return this.apollo.watchQuery<GQL.FindGalleryQuery, GQL.FindGalleryQueryVariables>({
      query: FIND_GALLERY,
      variables: {
        id: id
      }
    });
  }

  markerStrings(q?: string, sort?: string) {
    return this.apollo.watchQuery<GQL.MarkerStringsQuery, GQL.MarkerStringsQueryVariables>({
      query: MARKER_STRINGS,
      variables: {
        q: q,
        sort: sort
      }
    });
  }

  scrapeFreeones(performer_name: string) {
    return this.apollo.watchQuery<GQL.ScrapeFreeonesQuery, GQL.ScrapeFreeonesQueryVariables>({
      query: SCRAPE_FREEONES,
      variables: {
        performer_name: performer_name
      }
    });
  }

  scrapeFreeonesPerformers(query: string) {
    return this.apollo.watchQuery<GQL.ScrapeFreeonesPerformersQuery, GQL.ScrapeFreeonesPerformersQueryVariables>({
      query: SCRAPE_FREEONES_PERFORMERS,
      variables: {
        q: query
      }
    });
  }

  allTags() {
    return this.apollo.watchQuery<GQL.AllTagsQuery>({
      query: ALL_TAGS
    });
  }

  stats() {
    return this.apollo.watchQuery<GQL.StatsQuery>({
      query: STATS
    });
  }

  sceneUpdate(scene: GQL.SceneUpdateMutationVariables) {
    return this.apollo.mutate<GQL.SceneUpdateMutation, GQL.SceneUpdateMutationVariables>({
      mutation: SCENE_UPDATE,
      variables: {
        id: scene.id,
        title: scene.title,
        details: scene.details,
        url: scene.url,
        date: scene.date,
        rating: scene.rating,
        studio_id: scene.studio_id,
        gallery_id: scene.gallery_id,
        performer_ids: scene.performer_ids,
        tag_ids: scene.tag_ids
      },
      refetchQueries: [
        {
          query: FIND_SCENE,
          variables: {
            id: scene.id
          }
        }
      ],
    });
  }

  performerCreate(performer: GQL.PerformerCreateMutationVariables) {
    return this.apollo.mutate<GQL.PerformerCreateMutation, GQL.PerformerCreateMutationVariables>({
      mutation: PERFORMER_CREATE,
      variables: {
        name: performer.name,
        url: performer.url,
        birthdate: performer.birthdate,
        ethnicity: performer.ethnicity,
        country: performer.country,
        eye_color: performer.eye_color,
        height: performer.height,
        measurements: performer.measurements,
        fake_tits: performer.fake_tits,
        career_length: performer.career_length,
        tattoos: performer.tattoos,
        piercings: performer.piercings,
        aliases: performer.aliases,
        twitter: performer.twitter,
        instagram: performer.instagram,
        favorite: performer.favorite,
        image: performer.image
      },
      refetchQueries: [
        {
          query: ALL_PERFORMERS
        }
      ],
    });
  }

  performerUpdate(performer: GQL.PerformerUpdateMutationVariables) {
    return this.apollo.mutate<GQL.PerformerUpdateMutation, GQL.PerformerUpdateMutationVariables>({
      mutation: PERFORMER_UPDATE,
      variables: {
        id: performer.id,
        name: performer.name,
        url: performer.url,
        birthdate: performer.birthdate,
        ethnicity: performer.ethnicity,
        country: performer.country,
        eye_color: performer.eye_color,
        height: performer.height,
        measurements: performer.measurements,
        fake_tits: performer.fake_tits,
        career_length: performer.career_length,
        tattoos: performer.tattoos,
        piercings: performer.piercings,
        aliases: performer.aliases,
        twitter: performer.twitter,
        instagram: performer.instagram,
        favorite: performer.favorite,
        image: performer.image
      },
      refetchQueries: [
        {
          query: FIND_PERFORMER,
          variables: {
            id: performer.id
          }
        }
      ],
    });
  }

  studioCreate(studio: GQL.StudioCreateMutationVariables) {
    return this.apollo.mutate<GQL.StudioCreateMutation, GQL.StudioCreateMutationVariables>({
      mutation: STUDIO_CREATE,
      variables: {
        name: studio.name,
        url: studio.url,
        image: studio.image
      },
      refetchQueries: [
        {
          query: ALL_STUDIOS
        }
      ],
    });
  }

  studioUpdate(studio: GQL.StudioUpdateMutationVariables) {
    return this.apollo.mutate<GQL.StudioUpdateMutation, GQL.StudioUpdateMutationVariables>({
      mutation: STUDIO_UPDATE,
      variables: {
        id: studio.id,
        name: studio.name,
        url: studio.url,
        image: studio.image
      },
      refetchQueries: [
        {
          query: FIND_STUDIO,
          variables: {
            id: studio.id
          }
        }
      ],
    });
  }

  tagCreate(tag: GQL.TagCreateMutationVariables) {
    return this.apollo.mutate<GQL.TagCreateMutation, GQL.TagCreateMutationVariables>({
      mutation: TAG_CREATE,
      variables: {
        name: tag.name
      },
      refetchQueries: [
        {
          query: ALL_TAGS
        }
      ],
    });
  }

  markerCreate(title: string, seconds: number, scene_id: any) {
    return this.apollo.mutate<GQL.SceneMarkerCreateMutation, GQL.SceneMarkerCreateMutationVariables>({
      mutation: MARKER_CREATE,
      variables: {
        title: title,
        seconds: seconds,
        scene_id: scene_id
      },
      updateQueries: {
        FindScene: (record, mutation) => {
          const updatedRecord = { ...record };
          const newMarker = mutation.mutationResult.data.sceneMarkerCreate;
          newMarker.scene = { __typename: 'Scene', id: updatedRecord.findScene.id };
          updatedRecord.findScene.scene_markers.push(newMarker);
          return updatedRecord;
        },
      },
      refetchQueries: [
        {
          query: MARKER_STRINGS
        }
      ]
    });
  }

  markerDestory(id: any, scene_id: any) {
    return this.apollo.mutate<GQL.SceneMarkerDestroyMutation, GQL.SceneMarkerDestroyMutationVariables>({
      mutation: MARKER_DESTROY,
      variables: {
        id: id
      },
      refetchQueries: [
        {
          query: FIND_SCENE,
          variables: {
            id: scene_id
          }
        },
        {
          query: MARKER_STRINGS
        }
      ],
    });
  }

  metadataImport() {
    return this.apollo.watchQuery({
      query: METADATA_IMPORT
    });
  }

  metadataExport() {
    return this.apollo.watchQuery({
      query: METADATA_EXPORT
    });
  }

  metadataScan() {
    return this.apollo.watchQuery({
      query: METADATA_SCAN
    });
  }

  metadataGenerate() {
    return this.apollo.watchQuery({
      query: METADATA_GENERATE
    });
  }

  metadataClean() {
    return this.apollo.watchQuery({
      query: METADATA_CLEAN
    });
  }

  metadataUpdate() {
    return this.apollo.subscribe({
      query: METADATA_UPDATE_SUBSCRIPTION
    });
  }

}
