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

  getSceneFilter(): SceneFilterType {
    switch (this.type) {
      case CriteriaType.Rating: return { rating: Number(this.value) };
      case CriteriaType.Resolution: {
        switch (this.value) {
          case '240p': return { resolution: ResolutionEnum.LOW };
          case '480p': return { resolution: ResolutionEnum.STANDARD };
          case '720p': return { resolution: ResolutionEnum.STANDARD_HD };
          case '1080p': return { resolution: ResolutionEnum.FULL_HD };
          case '4k': return { resolution: ResolutionEnum.FOUR_K };
        }
        return {};
      }
      case CriteriaType.HasMarkers: return { has_markers: this.value };
      case CriteriaType.IsMissing: return { is_missing: this.value };
    }
  }

  getPerformerFilter(): PerformerFilterType {
    switch (this.type) {
      case CriteriaType.Favorite: return { filter_favorites: this.value === 'true' };
    }
  }

  getSceneMarkerFilter(): SceneMarkerFilterType {
    switch (this.type) {
      case CriteriaType.Tags: return { tags: this.values };
      case CriteriaType.SceneTags: return { scene_tags: this.values };
    }
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
  criterions: CriteriaOption[];
  criteria: Criteria = new Criteria();
  customCriteria: CustomCriteria[] = [];

  configureForFilterMode(filterMode: FilterMode) {
    switch (filterMode) {
      case FilterMode.Scenes:
        if (!!this.sortBy === false) { this.sortBy = 'date'; }
        this.sortByOptions = ['title', 'rating', 'date', 'filesize', 'duration'];
        this.criterions = [
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
        this.criterions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Favorite)
        ];
        break;
      case FilterMode.Studios:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'scenes_count'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      case FilterMode.Galleries:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'path'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      case FilterMode.SceneMarkers:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'seconds', 'scene_id'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Tags),
          new CriteriaOption(CriteriaType.SceneTags)
        ];
        break;
      default:
        this.sortByOptions = [];
        this.criterions = [new CriteriaOption(CriteriaType.None)];
        break;
    }
  }

  async configureCriteriaType(type: CriteriaType, stashService: StashService) {
    switch (type) {
      case CriteriaType.None: {
        this.criteria.type = CriteriaType.None;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.options = [];
        break;
      }
      case CriteriaType.Rating: {
        this.criteria.type = CriteriaType.Rating;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.parameterName = 'rating';
        this.criteria.options = [1, 2, 3, 4, 5];
        break;
      }
      case CriteriaType.Resolution: {
        this.criteria.type = CriteriaType.Resolution;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.parameterName = 'resolution';
        this.criteria.options = ['240p', '480p', '720p', '1080p', '4k'];
        break;
      }
      case CriteriaType.Favorite: {
        this.criteria.type = CriteriaType.Favorite;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.parameterName = 'filter_favorites';
        this.criteria.options = ['true', 'false'];
        break;
      }
      case CriteriaType.HasMarkers: {
        this.criteria.type = CriteriaType.HasMarkers;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.parameterName = 'has_markers';
        this.criteria.options = ['true', 'false'];
        break;
      }
      case CriteriaType.IsMissing: {
        this.criteria.type = CriteriaType.IsMissing;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.parameterName = 'is_missing';
        this.criteria.options = ['title', 'url', 'date', 'gallery', 'studio', 'performers'];
        break;
      }
      case CriteriaType.Tags: {
        this.criteria.type = CriteriaType.Tags;
        this.criteria.valueType = CriteriaValueType.Multiple;
        this.criteria.parameterName = 'tags';
        const result = await stashService.allTags().result();
        this.criteria.options = result.data.allTags.map(item => {
          return { id: item.id, name: item.name };
        });
        break;
      }
      case CriteriaType.SceneTags: {
        this.criteria.type = CriteriaType.SceneTags;
        this.criteria.valueType = CriteriaValueType.Multiple;
        this.criteria.parameterName = 'scene_tags';
        const result = await stashService.allTags().result();
        this.criteria.options = result.data.allTags.map(item => {
          return { id: item.id, name: item.name };
        });
        break;
      }
      default: {
        this.criteria.type = CriteriaType.None;
        this.criteria.valueType = CriteriaValueType.Single;
        this.criteria.options = [];
      }
    }

    this.criteria.value = null;
  }

  makeQueryParameters(): any {
    return {
      queryParams: {
        type: this.criteria.type,
        value: this.criteria.value,
        values: this.criteria.values,
        sortby: this.sortBy,
        sortdir: this.sortDirection,
        q: this.searchTerm
      },
      queryParamsHandling: 'merge'
    };
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
