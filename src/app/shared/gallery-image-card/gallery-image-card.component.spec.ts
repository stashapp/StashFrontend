import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImageCardComponent } from './gallery-image-card.component';

describe('GalleryImageCardComponent', () => {
  let component: GalleryImageCardComponent;
  let fixture: ComponentFixture<GalleryImageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryImageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
