import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

import * as localForage from 'localforage';

@Injectable()
export class CacheService {
  private _data: {[key: string]: any} = {};

  constructor() {
    localForage.config({
      name: 'StashApp',
      version: 1.0,
      storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
      description: 'some description'
    });
  }

    /**
     * Get item from storage
     * @param key
     */
    public getItem(key: string, callback?: (cachedValue: any) => Observable<any>): Observable<{}> {
      const obs = Observable.fromPromise(localForage.getItem(key));
      if (!callback) {
        return obs;
      }

      return obs.mergeMap(callback).catch(err => {
        console.log(err);
        return err;
      });
      // return this._data[key] ? this._data[key] : null;
    }

    /**
     * Set item to storage
     * @param key
     * @param value
     */
    public setItem(key: string, value: any): Promise<any> {
      return localForage.setItem(key, value);
      // this._data[key] = value;
      // return true;
    }

    /**
     * Remove item from storage
     * @param key
     */
    public removeItem(key: string): Promise<void> {
      return localForage.removeItem(key);
      // delete this._data[key];
    }

    /**
     * Clear item in storage
     */
    public clear(): Promise<void> {
      return localForage.clear();
      // this._data = [];
    }

}
