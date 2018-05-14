import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { StashService } from '../../core/stash.service';
import { Scene } from '../models/scene.model';
import { Performer } from '../models/performer.model';
import { ListFilter, DisplayMode, FilterMode, Criteria, CriteriaType } from '../models/list-state.model';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html'
})
export class ListFilterComponent implements OnInit, OnDestroy {
  DisplayMode = DisplayMode;
  CriteriaType = CriteriaType;

  @Input() filter: ListFilter;
  @Output() onFilterUpdate = new EventEmitter<ListFilter>();
  @ViewChild('criteriaValueSelect') criteriaValueSelect: any;

  itemsPerPageOptions = [20, 40, 60, 120];

  searchFormControl = new FormControl();

  constructor(private stashService: StashService) {}

  ngOnInit() {
    // todo: save filter state?
    this.filter.configureForFilterMode(this.filter.filterMode);
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.filter.searchTerm = term;
        this.onFilterUpdate.emit(this.filter);
      });
  }

  ngOnDestroy() {
    // this.searchFormControl.valueChanges.unsubscribe();
  }

  onPerPageChange(perPage: number) {
    this.filter.itemsPerPage = perPage;
    this.onFilterUpdate.emit(this.filter);
  }

  onSortChange() {
    this.filter.sortDirection = this.filter.sortDirection === 'asc' ? 'desc' : 'asc';
    this.onFilterUpdate.emit(this.filter);
  }

  onSortByChange(sortBy: string) {
    this.filter.sortBy = sortBy;
    this.onFilterUpdate.emit(this.filter);
  }

  onCriteriaTypeChange(criteriaType: CriteriaType) {
    this.criteriaValueSelect.selectedOption = null;
    this.filter.configureCriteriaType(criteriaType);
    this.onFilterUpdate.emit(this.filter);
  }

  onCriteriaValueChange(criteriaValue: string) {
    this.filter.criteria.value = criteriaValue;
    this.onFilterUpdate.emit(this.filter);
  }

  onModeChange(mode: DisplayMode) {
    this.filter.displayMode = mode;
    this.onFilterUpdate.emit(this.filter);
  }

  onChange(event) {
    // console.debug('filter change', this.filter);
  }

}
