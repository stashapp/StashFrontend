import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';

import { CacheService } from './cache.service';

import { Scene, SceneMarker } from '../shared/models/scene.model'
import { Performer } from '../shared/models/performer.model'
import { Tag } from '../shared/models/tag.model'
import { Studio } from '../shared/models/studio.model'
import { Gallery } from '../shared/models/gallery.model'
import { ApiResult } from '../shared/models/api-result.model'
import { ListFilter, CriteriaType, CustomCriteria } from '../shared/models/list-state.model';

import * as stringify from 'json-stringify-safe';

@Injectable()
export class StashService {
  url = 'http://localhost:4000';
  private observableCache: { [key: string]: Observable<any> } = {};

  constructor(private http: Http,
              private cache: CacheService,
              private platformLocation: PlatformLocation) {
    const platform: any = this.platformLocation;
    const url = new URL(platform.location.origin)
    url.port = '4000'
    this.url = url.toString().slice(0, -1);
  }

  getScenes(page?: number, filter?: ListFilter): Observable<ApiResult<Scene>> {
    const params = new URLSearchParams();
    if (page) { params.set('page', page.toString()) }
    if (!!filter) {
      if (filter.searchTerm) { params.set('q', filter.searchTerm); }
      if (filter.itemsPerPage) { params.set('per_page', filter.itemsPerPage.toString()) }
      if (filter.sortBy) { params.set('sort', filter.sortBy) }
      if (filter.sortDirection) { params.set('direction', filter.sortDirection) }
      if (filter.criteriaFilterOpen && !!filter.criteria.value) {
        params.set(filter.criteria.parameterName, filter.criteria.value);
      }
      if (filter.customCriteria) {
        filter.customCriteria.forEach(criteria => {
          params.set(criteria.key, criteria.value);
        });
      }
    }
    
    return this.http.get(this.url + '/scenes.json' + '?' + params.toString())
                    .map(this.extractData)
                    // .flatMap((scenes: Scene[]) => {
                    //   if (scenes.length > 0) {
                    //     const sceneObservables = scenes.map(scene => this.getScene(scene.id));
                    //     return Observable.forkJoin(sceneObservables);
                    //   }
                    //   return Observable.of([]);
                    // });
  }

  getScenesWithIds(sceneIds?: number[]): Observable<Scene[]> {
    if (!!sceneIds === false) { return Observable.of([]); }
    const sceneObservables = sceneIds.map(sceneId => this.getScene(sceneId));
    if (sceneObservables.length === 0) {
      console.log('No scenes.  Returning empty observable');
      return Observable.of([]);
    }
    return Observable.forkJoin(sceneObservables);
  }

  getScene(sceneId: number): Observable<Scene> {
    // return this.cache.getItem('scene-' + sceneId, cachedValue => {
    //   if (cachedValue != null) {
    //     return Observable.of(cachedValue);
    //   } else {
        return this.fetchScene(sceneId);
    //   }
    // });
  }

  getScenesForWall(q: string): Observable<Scene[]> {
    const params = new URLSearchParams();
    if (q) { params.set('q', q); }
    return this.http.get(this.url + '/scenes/wall.json' + '?' + params.toString())
                    .map(this.extractData)
  }

  getSceneMarkersForWall(q: string): Observable<SceneMarker[]> {
    const params = new URLSearchParams();
    if (q) { params.set('q', q); }
    return this.http.get(this.url + '/markers/wall.json' + '?' + params.toString())
                    .map(this.extractData)
  }

  fetchScene(sceneId: number): Observable<Scene> {
    return this.http.get(this.url + `/scenes/${sceneId}.json`)
                    .map(this.extractData)
                    .flatMap((scene: Scene) => {
                      return Observable.forkJoin(
                        Observable.of(scene),
                        this.getPerformersWithIds(scene.performer_ids),
                        // this.getPublished(book.id)
                      );
                    }).map((sceneDetails) => {
                      console.log(sceneDetails)
                      const scene = sceneDetails[0];
                      const performers = sceneDetails[1];
                      // var publisher = bookDetails[2];

                      scene.fetchedPerformers = performers;
                      // book.publisher = publisher;

                      this.cache.setItem('scene-' + scene.id, scene);
                      return scene;
                  });
  }

  updateScene(scene: Scene): Observable<ApiResult<Scene>> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(scene);

    return this.http.patch(this.url + `/scenes/${scene.id}.json`, body, options)
                    .map(this.extractData);
  }

  createSceneMarker(sceneMarker: SceneMarker): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(sceneMarker);

    return this.http.post(this.url + `/scenes/${sceneMarker.scene_id}/scene_markers.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteSceneMarker(sceneMarker: SceneMarker): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(this.url + `/scenes/${sceneMarker.scene_id}/scene_markers/${sceneMarker.id}.json`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPerformersWithIds(performerIds?: number[]): Observable<Performer[]> {
    if (!!performerIds) {
      const performerObservables = performerIds.map(performerId => this.getPerformer(performerId));
      if (performerObservables.length === 0) {
        console.log('No performers.  Returning empty observable');
        return Observable.of([]);
      }
      return Observable.forkJoin(performerObservables);
    } else {
      return this.http.get(this.url + '/performers.json')
                      .map(this.extractData)
    }
  }

  getPerformers(page?: number, filter?: ListFilter): Observable<ApiResult<Performer>> {
    const params = new URLSearchParams();
    if (page) { params.set('page', page.toString()) }
    if (!!filter) {
      if (filter.searchTerm) { params.set('q', filter.searchTerm); }
      if (filter.itemsPerPage) { params.set('per_page', filter.itemsPerPage.toString()) }
      if (filter.sortBy) { params.set('sort', filter.sortBy) }
      if (filter.sortDirection) { params.set('direction', filter.sortDirection) }
      if (filter.criteriaFilterOpen && !!filter.criteria.value) {
        params.set(filter.criteria.parameterName, filter.criteria.value);
      }
    }
    return this.http.get(this.url + '/performers.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getAllPerformers(): Observable<ApiResult<Performer>> {
    const params = new URLSearchParams();
    params.set('all', 'true');
    return this.http.get(this.url + '/performers.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getPerformer(performerId: number): Observable<Performer> {
    // return this.cache.getItem('performer-' + performerId, cachedValue => {
    //   if (cachedValue != null) {
    //     return Observable.of(cachedValue);
    //   } else {
        return this.fetchPerformer(performerId);
    //   }
    // });
  }

  fetchPerformer(performerId: number): Observable<Performer> {
    const url = this.url + `/performers/${performerId}.json`;
    return this.cacheable(url, this.http.get(url)
                                        .map(this.extractData)
                                        // .map(performer => this.cache.setItem('performer-' + performerId, performer))
                                        .catch(this.handleError))
  }

  createPerformer(performer: Performer): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(performer);

    return this.http.post(this.url + `/performers.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updatePerformer(performer: Performer): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = stringify(performer);

    return this.http.patch(this.url + `/performers/${performer.id}.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTagsWithIds(tagIds?: number[]): Observable<Tag[]> {
    if (!!tagIds === false) { return Observable.of([]); }
    const tagObservables = tagIds.map(tagId => this.getTag(tagId));
    if (tagObservables.length === 0) {
      console.log('No tags.  Returning empty observable');
      return Observable.of([]);
    }
    return Observable.forkJoin(tagObservables);
  }

  getTags(q?: string, page?: number, perPage?: number): Observable<ApiResult<Tag>> {
    const params = new URLSearchParams();
    if (q) { params.set('q', q); }
    if (page) { params.set('page', page.toString()) }
    if (perPage) { params.set('per_page', perPage.toString()) }
    return this.http.get(this.url + '/tags.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getAllTags(): Observable<ApiResult<Tag>> {
    const params = new URLSearchParams();
    params.set('all', 'true');
    return this.http.get(this.url + '/tags.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getTag(tagId: number): Observable<Tag> {
    return this.fetchTag(tagId);
  }

  fetchTag(tagId: number): Observable<Tag> {
    const url = this.url + `/tags/${tagId}.json`;
    return this.cacheable(url, this.http.get(url)
                                        .map(this.extractData)
                                        // .map(performer => this.cache.setItem('performer-' + performerId, performer))
                                        .catch(this.handleError))
  }

  createTag(tag: Tag): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(tag);

    return this.http.post(this.url + `/tags.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateTag(tag: Tag): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = stringify(tag);

    return this.http.patch(this.url + `/tags/${tag.id}.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAllStudios(): Observable<ApiResult<Studio>> {
    const params = new URLSearchParams();
    params.set('all', 'true');
    return this.http.get(this.url + '/studios.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getStudios(page?: number, filter?: ListFilter): Observable<ApiResult<Studio>> {
    const params = new URLSearchParams();
    if (page) { params.set('page', page.toString()) }
    if (!!filter) {
      if (filter.searchTerm) { params.set('q', filter.searchTerm); }
      if (filter.itemsPerPage) { params.set('per_page', filter.itemsPerPage.toString()) }
      if (filter.sortBy) { params.set('sort', filter.sortBy) }
      if (filter.sortDirection) { params.set('direction', filter.sortDirection) }
      if (filter.criteriaFilterOpen && !!filter.criteria.value) {
        params.set(filter.criteria.parameterName, filter.criteria.value);
      }
    }
    return this.http.get(this.url + '/studios.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getStudio(studioId: number): Observable<Studio> {
    if (!!studioId === false) { return Observable.throw('Trying to get studio without an ID'); }
    return this.fetchStudio(studioId);
  }

  fetchStudio(studioId: number): Observable<Studio> {
    const url = this.url + `/studios/${studioId}.json`;
    return this.cacheable(url, this.http.get(url)
                                        .map(this.extractData)
                                        .catch(this.handleError))
  }

  createStudio(studio: Studio): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(studio);

    return this.http.post(this.url + `/studios.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updateStudio(studio: Studio): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(studio);

    return this.http.patch(this.url + `/studios/${studio.id}.json`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getValidGalleriesForScene(sceneId: number): Observable<ApiResult<Gallery>> {
    const params = new URLSearchParams();
    params.set('scene_id', sceneId.toString());
    return this.http.get(this.url + '/galleries.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  fetchGallery(galleryId: number): Observable<Gallery> {
    const url = this.url + `/galleries/${galleryId}.json`;
    return this.cacheable(url, this.http.get(url)
                                        .map(this.extractData)
                                        .catch(this.handleError))
  }

  getGallery(galleryId: number): Observable<Gallery> {
    if (!!galleryId) {
      return this.fetchGallery(galleryId);
    }
  }

  getGalleries(page?: number, filter?: ListFilter): Observable<ApiResult<Gallery>> {
    const params = new URLSearchParams();
    if (page) { params.set('page', page.toString()) }
    if (!!filter) {
      if (filter.searchTerm) { params.set('q', filter.searchTerm); }
      if (filter.itemsPerPage) { params.set('per_page', filter.itemsPerPage.toString()) }
      if (filter.sortBy) { params.set('sort', filter.sortBy) }
      if (filter.sortDirection) { params.set('direction', filter.sortDirection) }
      if (filter.criteriaFilterOpen && !!filter.criteria.value) {
        params.set(filter.criteria.parameterName, filter.criteria.value);
      }
    }
    return this.http.get(this.url + '/galleries.json' + '?' + params.toString())
                    .map(this.extractData);
  }

  getStatus(): Observable<any> {
    const url = this.url + `/status.json`;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  startScan() {
    const url = this.url + `/scan.json`;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError)
                    .subscribe(data => console.log(''));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    if (error instanceof Response) {
      const body = !!error.json().errors ? error.json().errors : error.json();
      const message: string = !!body.message ? body.message : error.toString();
      console.error(message);
      return Observable.throw(body);
    } else {
      return Observable.throw(error);
    }
  }

  private cacheable<T>(key: string, observable: Observable<T>): Observable<T> {
    if (!!key && this.observableCache[key]) {
      return this.observableCache[key] as Observable<T>;
    }
    const replay = new ReplaySubject<T>(1);
    observable.subscribe(
      x => replay.next(x),
      x => replay.error(x),
      () => replay.complete()
    );
    const replayObservable = replay.asObservable();
    if (!!key) {
      this.observableCache[key] = replayObservable;
    }
    return replayObservable;
  }

}
