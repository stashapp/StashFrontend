import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioFormComponent } from './studio-form.component';

describe('StudioFormComponent', () => {
  let component: StudioFormComponent;
  let fixture: ComponentFixture<StudioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
