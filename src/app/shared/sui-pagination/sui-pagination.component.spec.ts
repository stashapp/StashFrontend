import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiPaginationComponent } from './sui-pagination.component';

describe('SuiPaginationComponent', () => {
  let component: SuiPaginationComponent;
  let fixture: ComponentFixture<SuiPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
