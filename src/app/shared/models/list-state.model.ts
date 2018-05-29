import { Scene, SceneMarker } from './scene.model';
import { Performer } from './performer.model';
import { Studio } from './studio.model';
import { Gallery } from './gallery.model';
import { SceneFilterType, ResolutionEnum, PerformerFilterType, SceneMarkerFilterType } from '../../core/graphql-generated';
import { StashService } from '../../core/stash.service';

export enum DisplayMode {
  Grid,
  List
}

export enum FilterMode {
  Scenes,
  Performers,
  Studios,
  Galleries,
  SceneMarkers
}

export class CustomCriteria {
  key: string;
  value: string;
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export enum CriteriaType {
  None,
  Rating,
  Resolution,
  Favorite,
  HasMarkers,
  IsMissing,
  Tags,
  SceneTags
}

export enum CriteriaValueType {
  Single,
  Multiple
}

export class CriteriaOption {
  name: string;
  value: CriteriaType;
  constructor(type: CriteriaType) {
    this.name = CriteriaType[type];
    this.value = type;
  }
}

export class Criteria {
  type: CriteriaType;
  valueType: CriteriaValueType;
  options: any[] = [];
  parameterName: string;
  value: string;
  values: string[];

  async configure(type: CriteriaType, stashService: StashService) {
    switch (type) {
      case CriteriaType.None: {
        this.type = CriteriaType.None;
        this.valueType = CriteriaValueType.Single;
        this.options = [];
        break;
      }
      case CriteriaType.Rating: {
        this.type = CriteriaType.Rating;
        this.valueType = CriteriaValueType.Single;
        this.parameterName = 'rating';
        this.options = [1, 2, 3, 4, 5];
        break;
      }
      case CriteriaType.Resolution: {
        this.type = CriteriaType.Resolution;
        this.valueType = CriteriaValueType.Single;
        this.parameterName = 'resolution';
        this.options = ['240p', '480p', '720p', '1080p', '4k'];
        break;
      }
      case CriteriaType.Favorite: {
        this.type = CriteriaType.Favorite;
        this.valueType = CriteriaValueType.Single;
        this.parameterName = 'filter_favorites';
        this.options = ['true', 'false'];
        break;
      }
      case CriteriaType.HasMarkers: {
        this.type = CriteriaType.HasMarkers;
        this.valueType = CriteriaValueType.Single;
        this.parameterName = 'has_markers';
        this.options = ['true', 'false'];
        break;
      }
      case CriteriaType.IsMissing: {
        this.type = CriteriaType.IsMissing;
        this.valueType = CriteriaValueType.Single;
        this.parameterName = 'is_missing';
        this.options = ['title', 'url', 'date', 'gallery', 'studio', 'performers'];
        break;
      }
      case CriteriaType.Tags: {
        this.type = CriteriaType.Tags;
        this.valueType = CriteriaValueType.Multiple;
        this.parameterName = 'tags';
        const result = await stashService.allTags().result();
        this.options = result.data.allTags.map(item => {
          return { id: item.id, name: item.name };
        });
        break;
      }
      case CriteriaType.SceneTags: {
        this.type = CriteriaType.SceneTags;
        this.valueType = CriteriaValueType.Multiple;
        this.parameterName = 'scene_tags';
        const result = await stashService.allTags().result();
        this.options = result.data.allTags.map(item => {
          return { id: item.id, name: item.name };
        });
        break;
      }
      default: {
        this.type = CriteriaType.None;
        this.valueType = CriteriaValueType.Single;
        this.options = [];
      }
    }

    this.value = ''; // Need this or else we send invalid value to the new filter
    // this.values = []; // TODO this seems to break the "Multiple" filters
  }
}

export class ListFilter {
  searchTerm?: string;
  performers?: number[];
  itemsPerPage = 40;
  sortDirection = 'asc';
  sortBy: string;
  displayMode = DisplayMode.Grid;
  filterMode: FilterMode;
  sortByOptions: string[];
  criteriaFilterOpen = false;
  criteriaOptions: CriteriaOption[];
  criterions: Criteria[] = [];
  customCriteria: CustomCriteria[] = [];

  configureForFilterMode(filterMode: FilterMode) {
    switch (filterMode) {
      case FilterMode.Scenes:
        if (!!this.sortBy === false) { this.sortBy = 'date'; }
        this.sortByOptions = ['title', 'rating', 'date', 'filesize', 'duration'];
        this.criteriaOptions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Rating),
          new CriteriaOption(CriteriaType.Resolution),
          new CriteriaOption(CriteriaType.HasMarkers),
          new CriteriaOption(CriteriaType.IsMissing)
        ];
        break;
      case FilterMode.Performers:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'height', 'birthdate', 'scenes_count'];
        this.criteriaOptions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Favorite)
        ];
        break;
      case FilterMode.Studios:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'scenes_count'];
        this.criteriaOptions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      case FilterMode.Galleries:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'path'];
        this.criteriaOptions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      case FilterMode.SceneMarkers:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'seconds', 'scene_id'];
        this.criteriaOptions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Tags),
          new CriteriaOption(CriteriaType.SceneTags)
        ];
        break;
      default:
        this.sortByOptions = [];
        this.criteriaOptions = [new CriteriaOption(CriteriaType.None)];
        break;
    }
  }

  configureFromQueryParameters(params, stashService: StashService) {
    if (params['sortby'] != null) {
      this.sortBy = params['sortby'];
    }
    if (params['sortdir'] != null) {
      this.sortDirection = params['sortdir'];
    }
    if (params['q'] != null) {
      this.searchTerm = params['q'];
    }

    if (params['c'] != null) {
      this.criterions = [];

      let jsonParameters: any[];
      if (params['c'] instanceof Array) {
        jsonParameters = params['c'];
      } else {
        jsonParameters = [params['c']];
      }

      if (jsonParameters.length !== 0) {
        this.criteriaFilterOpen = true;
      }

      jsonParameters.forEach(jsonString => {
        const encodedCriteria = JSON.parse(jsonString);
        const criteria = new Criteria();
        criteria.configure(encodedCriteria.type, stashService);
        if (criteria.valueType === CriteriaValueType.Single) {
          criteria.value = encodedCriteria.value;
        } else {
          criteria.values = encodedCriteria.values;
        }
        this.criterions.push(criteria);
      });
    }
  }

  makeQueryParameters(): any {
    const encodedCriterion = [];
    this.criterions.forEach(criteria => {
      const encodedCriteria: any = {};
      encodedCriteria.type = criteria.type;
      if (criteria.valueType === CriteriaValueType.Single) {
        encodedCriteria.value = criteria.value;
      } else {
        encodedCriteria.values = criteria.values;
      }
      const jsonCriteria = JSON.stringify(encodedCriteria);
      encodedCriterion.push(jsonCriteria);
    });

    const result = {
      queryParams: {
        sortby: this.sortBy,
        sortdir: this.sortDirection,
        q: this.searchTerm,
        c: encodedCriterion
      },
      queryParamsHandling: 'merge'
    };
    return result;
  }

  // TODO: These don't support multiple of the same criteria, only the last one set is used.

  makeSceneFilter(): SceneFilterType {
    const result: SceneFilterType = {};
    this.criterions.forEach(criteria => {
      switch (criteria.type) {
        case CriteriaType.Rating:
          result.rating = Number(criteria.value);
          break;
        case CriteriaType.Resolution: {
          switch (criteria.value) {
            case '240p': result.resolution = ResolutionEnum.LOW; break;
            case '480p': result.resolution = ResolutionEnum.STANDARD; break;
            case '720p': result.resolution = ResolutionEnum.STANDARD_HD; break;
            case '1080p': result.resolution = ResolutionEnum.FULL_HD; break;
            case '4k': result.resolution = ResolutionEnum.FOUR_K; break;
          }
          break;
        }
        case CriteriaType.HasMarkers:
          result.has_markers = criteria.value;
          break;
        case CriteriaType.IsMissing:
          result.is_missing = criteria.value;
          break;
      }
    });
    return result;
  }

  makePerformerFilter(): PerformerFilterType {
    const result: PerformerFilterType = {};
    this.criterions.forEach(criteria => {
      switch (criteria.type) {
        case CriteriaType.Favorite:
          result.filter_favorites = criteria.value === 'true';
          break;
      }
    });
    return result;
  }

  makeSceneMarkerFilter(): SceneMarkerFilterType {
    const result: SceneMarkerFilterType = {};
    this.criterions.forEach(criteria => {
      switch (criteria.type) {
        case CriteriaType.Tags:
          result.tags = criteria.values;
          break;
        case CriteriaType.SceneTags:
          result.scene_tags = criteria.values;
          break;
      }
    });
    return result;
  }
}

export class ListState<T> {
  currentPage = 1;
  totalCount: number;
  scrollY: number;
  filter: ListFilter = new ListFilter();
  data: T[];

  reset() {
    this.data = null;
    this.totalCount = null;
  }
}

export class SceneListState extends ListState<Scene> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Scenes;
  }
}

export class PerformerListState extends ListState<Performer> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Performers;
  }
}

export class StudioListState extends ListState<Studio> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Studios;
  }
}

export class GalleryListState extends ListState<Gallery> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Galleries;
  }
}

export class SceneMarkerListState extends ListState<SceneMarker> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.SceneMarkers;
  }
}
