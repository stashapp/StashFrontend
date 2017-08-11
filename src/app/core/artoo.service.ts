import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Scene } from '../shared/models/scene.model';
import { Performer } from '../shared/models/performer.model';
import { Tag } from '../shared/models/tag.model';
import { Studio } from '../shared/models/studio.model';
import { Gallery } from '../shared/models/gallery.model';

export class ArtooResponse {
  title: string;
  date: string;
  studio_id: number;
  tag_ids: number[];
  details: string;
}

@Injectable()
export class ArtooService {

  constructor(private http: Http) { }

  scrape(url: string, studios: Studio[], tags: Tag[]) {
    if (url.includes('blacked')) {
      return this.scrapeBlacked(url, studios, tags);
    } else if (url.includes('shoplyfter')) {
      return this.scrapeShoplyfter(url, studios, tags);
    } else if (url.includes('dadcrush')) {
      return this.scrapeDadcrush(url, studios, tags);
    } else if (url.includes('freeones')) {
      return this.scrapeFreeones(url);
    } else if (url.includes('fakehub')) {
      return this.scrapeFakeHub(url, studios, tags);
    } else if (url.includes('gloryhole.com')) {
      return this.scrapeDogfart(url, studios, tags);
    } else {
      console.log('no scrapper');
    }
  }

  scrapeFreeones(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const w = window as any
      w.getEthnicity = function getEthnicity(eth) {
        switch(eth) {
          case 'Caucasian':
            return 'white';
          case 'Black':
            return 'black';
          case 'Latin':
            return 'hispanic';
          case 'Asian':
            return 'asian';
          default:
            return null;
        }
      }

      w.getIndexes = function getIndexes(paramnames) {
        var $ = w.artoo.$;
        var result: any = {};
        paramnames.each(function(i, val) {
          var name = $(val).text().trim();
          switch(name) {
            case 'Babe Name:':
              result.name = i
              break;
            case 'Ethnicity:':
              result.ethnicity = i;
              break;
            case 'Country of Origin:':
              result.country = i;
              break;
            case 'Date of Birth:':
              result.birthdate = i;
              break;
            case 'Eye Color:':
              result.eye_color = i;
              break;
            case 'Height:':
              result.height = i;
              break;
            case 'Measurements:':
              result.measurements = i;
              break;
            case 'Fake boobs:':
              result.fake_tits = i;
              break;
            case 'Career Start And End':
              result.career_length = i;
              break;
            case 'Tattoos:':
              result.tattoos = i;
              break;
            case 'Piercings:':
              result.piercings = i;
              break;
            case 'Aliases:':
              result.aliases = i;
              break;
            default:
              break;
          }
        });

        return result;
      }
      const that = this;
      
      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        var params = remote.find('.paramvalue');
        var paramIndexes = w.getIndexes(remote.find('.paramname'));

        json.name = $(params[paramIndexes.name]).text().trim();
        var ethnicity = $(params[paramIndexes.ethnicity]).text().trim();
        json.ethnicity = w.getEthnicity(ethnicity);
        json.country = $(params[paramIndexes.country]).text().trim();
        var birth = $(params[paramIndexes.birthdate]).text().trim().replace(/ \(\d* years old\)/g, "");
        if (birth != "Unknown" && birth != undefined && birth != "") {
          var birthdate = new Date(birth);
          json.birthdate = birthdate.toISOString().slice(0,10);
        }
        json.eye_color = $(params[paramIndexes.eye_color]).text().trim();
        var height = $(params[paramIndexes.height]).text();
        var match = /heightcm = "(.*)";/g.exec(height);
        if (match[1] != undefined) {
          // json.height = $(params[paramIndexes.height]).text().replace(/<!--[\s\S]*-->/g, '').trim();
          json.height = match[1];
        }
        json.measurements = $(params[paramIndexes.measurements]).text().trim();
        json.fake_tits = $(params[paramIndexes.fake_tits]).text().trim();
        json.career_length = $(params[paramIndexes.career_length]).text().replace(/\([\s\S]*/g, '').trim();
        json.tattoos = $(params[paramIndexes.tattoos]).text().trim();
        json.piercings = $(params[paramIndexes.piercings]).text().trim();
        json.aliases = $(params[paramIndexes.aliases]).text().trim();

        var twitter = remote.find('.twitter a').attr('href');
        if (twitter != undefined) {
          json.twitter = twitter.replace(/(^\w+:|^)\/\/(www\.)?/, '').replace('twitter.com', '').replace(/\//g, '');
        }
        var instagram = remote.find('.instagram a').attr('href');
        if (instagram != undefined) {
          json.instagram = instagram.replace(/(^\w+:|^)\/\/(www\.)?/, '').replace('instagram.com', '').replace(/\//g, '');
        }

        $.each(json, function(key, value) {
          if (value === "" || value === null) {
            delete json[key];
          }
        });
        resolve(json);
      });
    });
  }

  scrapeBlacked(url: string, studios: Studio[], tags: Tag[]): Promise<ArtooResponse> {
    return new Promise((resolve, reject) => {
      const w = window as any
      w.capitalize = function capitalize(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
      const that = this;
      
      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        json.title = remote.find('.caption-title').text().trim();
        var dateStr = remote.find('.player-description-detail > .info').text().trim();
        if (dateStr != "Unknown" && dateStr != undefined && dateStr != "") {
          var date = new Date(dateStr);
          json.date = date.toISOString().slice(0, 10);
        }

        var remoteTags = remote.find('.video-tags-list li').map(function() { return w.capitalize($.trim($(this).text())); }).get();

        json.description = "Starring:\n"
        json.description += remote.find('.caption-text').text().replace('Featuring ', '').replace(' & ', ', ')
        json.description += "\n\nTags:\n";
        json.description += remoteTags.join(', ');
        json.description += "\n\nRating:\n\n";
        json.description += remote.find('.caption-rate > .totalrate').text().trim();
        json.description += "\n\nDescription:\n\n";
        json.description += remote.find('.player-description > .moreless').text().trim();

        const response = new ArtooResponse();
        response.title = json.title;
        response.date = json.date;
        response.studio_id = studios.find((value: Studio, index: number, obj: Studio[]) => {
          return value.name == 'Blacked';
        }).id
        response.tag_ids = tags.filter((value: Tag, index: number, array: Tag[]) => {
          return remoteTags.find((v: any, index: number, obj: any[]) => { return v == value.name }) != undefined
        }).map(tag => { return tag.id });
        response.details = json.description;

        resolve(response);
      });
    });
  }

  scrapeShoplyfter(url: string, studios: Studio[], tags: Tag[]): Promise<ArtooResponse> {
    return new Promise((resolve, reject) => {
      const w = window as any
      w.capitalize = function capitalize(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
      const that = this;
      
      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        json.title = remote.find('.girl-info h1').text().trim();

        var dateStr = remote.find('span:contains(DATE PUBLISHED: )').text().replace('DATE PUBLISHED: ', '').trim();
        if (dateStr != "Unknown" && dateStr != undefined && dateStr != "") {
          var date = new Date(dateStr);
          json.date = date.toISOString().slice(0, 10);
        }

        json.description = "Starring:\n\n"
        json.description += url.split('/').slice(-1).pop().replace('_', ' ');
        json.description += "\n\nRating:\n\n";
        json.description += remote.find('.thumbs-percentage').text().trim() + '%';
        json.description += "\n\nDescription:\n\n";
        json.description += remote.find('.story').text().trim();

        const response = new ArtooResponse();
        response.title = json.title;
        response.date = json.date;
        response.studio_id = studios.find((value: Studio, index: number, obj: Studio[]) => {
          return value.name == 'Shoplyfter';
        }).id
        response.details = json.description;

        resolve(response);
      });
    });
  }

  scrapeDadcrush(url: string, studios: Studio[], tags: Tag[]): Promise<ArtooResponse> {
    return new Promise((resolve, reject) => {
      const w = window as any
      w.capitalize = function capitalize(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
      const that = this;
      
      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        json.title = remote.find('.girl-info h1').text().trim();

        var dateStr = remote.find('span:contains(DATE PUBLISHED: )').text().replace('DATE PUBLISHED: ', '').trim();
        if (dateStr != "Unknown" && dateStr != undefined && dateStr != "") {
          var date = new Date(dateStr);
          json.date = date.toISOString().slice(0, 10);
        }

        json.description = "Starring:\n\n"
        json.description += url.split('/').slice(-1).pop().replace('_', ' ');
        json.description += "\n\nRating:\n\n";
        json.description += remote.find('.thumbs-percentage').text().trim() + '%';
        json.description += "\n\nDescription:\n\n";
        json.description += remote.find('.story').text().trim();

        const response = new ArtooResponse();
        response.title = json.title;
        response.date = json.date;
        response.studio_id = studios.find((value: Studio, index: number, obj: Studio[]) => {
          return value.name == 'Dad Crush';
        }).id
        response.details = json.description;

        resolve(response);
      });
    });
  }

  scrapeFakeHub(url: string, studios: Studio[], tags: Tag[]): Promise<ArtooResponse> {
    return new Promise((resolve, reject) => {
      const w = window as any;
      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        json.title = remote.find('.scene-title').text().trim();
        var dateStr = remote.find('time.about-scene-released').text().trim();
        if (dateStr != "Unknown" && dateStr != undefined && dateStr != "") {
          var split = dateStr.split('-');
          json.date = split[2] + '-' + split[1] + '-' + split[0]
        }
        json.description = "Categories:\n\n";
        json.description += remote.find('.about-scene-cat var').map(function() { return $.trim($(this).text()); }).get().join(', ');
        json.description += "\n\n\nDescription:\n\n";
        json.description += remote.find('.about-scene-desc').text().trim();

        const response = new ArtooResponse();
        response.title = json.title;
        response.date = json.date;
        response.studio_id = studios.find((value: Studio, index: number, obj: Studio[]) => {
          return value.name == remote.find('.release-info-container .sub-site-name').text().trim();
        }).id
        response.details = json.description;

        resolve(response);
      });
    });
  }

  scrapeDogfart(url: string, studios: Studio[], tags: Tag[]): Promise<ArtooResponse> {
    return new Promise((resolve, reject) => {
      const w = window as any
      w.capitalize = function capitalize(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
      const that = this;

      w.artoo.ajaxSpider([url], {jquerify: true}, function(data) {
        var $ = w.artoo.$;
        var remote = $(data[0]);
        var json: any = {};

        var scene = remote.find('.scene-container').first();
        var remoteTags = scene.find('p:contains(Categories:) a').map(function() { return w.capitalize($.trim($(this).text())); }).get();

        json.title = scene.find('#title').text().replace('Add To Favorites', '').trim();
        var dateStr = scene.text().match(/Date: (\d{2}\/\d{2}\/\d{4})/)[1];
        if (dateStr != "Unknown" && dateStr != undefined && dateStr != "") {
          var date = new Date(dateStr);
          json.date = date.toISOString().slice(0, 10);
        }
        json.description = "Categories:\n\n";
        json.description += scene.find('p:contains(Categories:) a').map(function() { return $.trim($(this).text()); }).get().join(', ');
        json.description += "\n\n\nDescription:\n\n";
        json.description += scene.find('.ratings-container').text().split(' ')[3].replace('Please', '').trim();
        json.description += "\n";
        json.description += scene.find('p.description').text().trim();

        const response = new ArtooResponse();
        response.title = json.title;
        response.date = json.date;
        response.studio_id = studios.find((value: Studio, index: number, obj: Studio[]) => {
          return value.name.toUpperCase() == remote.find('a.home').text().trim().toUpperCase();
        }).id
        response.tag_ids = tags.filter((value: Tag, index: number, array: Tag[]) => {
          return remoteTags.find((v: any, index: number, obj: any[]) => { return v == value.name }) != undefined
        }).map(tag => { return tag.id });
        response.details = json.description;

        resolve(response);
      });
    });
  }
}
