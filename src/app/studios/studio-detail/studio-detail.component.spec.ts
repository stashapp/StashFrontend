import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDetailComponent } from './studio-detail.component';

describe('StudioDetailComponent', () => {
  let component: StudioDetailComponent;
  let fixture: ComponentFixture<StudioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
