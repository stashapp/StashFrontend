import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesComponent } from './galleries.component';

describe('GalleriesComponent', () => {
  let component: GalleriesComponent;
  let fixture: ComponentFixture<GalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
