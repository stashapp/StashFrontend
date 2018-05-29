import { Component, OnInit, OnDestroy, Input, Output, ViewChildren, EventEmitter, ElementRef, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { StashService } from '../../core/stash.service';
import { Scene } from '../models/scene.model';
import { Performer } from '../models/performer.model';
import { ListFilter, DisplayMode, FilterMode, Criteria, CriteriaType, CriteriaValueType } from '../models/list-state.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html'
})
export class ListFilterComponent implements OnInit, OnDestroy {
  DisplayMode = DisplayMode;
  CriteriaType = CriteriaType;
  CriteriaValueType = CriteriaValueType;

  @Input() filter: ListFilter;
  @Output() onFilterUpdate = new EventEmitter<ListFilter>();
  @ViewChildren('criteriaValueSelect') criteriaValueSelectInputs: QueryList<ElementRef>;
  @ViewChildren('criteriaValuesSelect') criteriaValuesSelectInputs: QueryList<ElementRef>;

  itemsPerPageOptions = [20, 40, 60, 120];

  searchFormControl = new FormControl();

  constructor(private stashService: StashService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter.configureFromQueryParameters(params, this.stashService);
      if (params['q'] != null) {
        this.searchFormControl.setValue(this.filter.searchTerm);
      }
    });

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

    this.onFilterUpdate.emit(this.filter);
  }

  ngOnDestroy() {
    // this.searchFormControl.valueChanges.unsubscribe();
  }

  onPerPageChange(perPage: number) {
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

  onAddCriteria() {
    const criteria = new Criteria();
    this.filter.criterions.push(criteria);
  }

  onDeleteCriteria(criteria: Criteria) {
    const idx = this.filter.criterions.indexOf(criteria);
    this.filter.criterions.splice(idx, 1);
    this.onFilterUpdate.emit(this.filter);
  }

  onCriteriaTypeChange(criteriaType: CriteriaType, criteria: Criteria) {
    // if (!!this.criteriaValueSelect) {
    //   this.criteriaValueSelect.selectedOption = null;
    // }
    // if (!!this.criteriaValuesSelect) {
    //   this.criteriaValuesSelect.selectedOptions = null;
    // }
    criteria.configure(criteriaType, this.stashService);
    this.onFilterUpdate.emit(this.filter);
  }

  onCriteriaValueChange(criteriaValue: string) {
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
