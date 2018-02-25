import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneDetailScrubberComponent } from './scene-detail-scrubber.component';

describe('SceneDetailScrubberComponent', () => {
  let component: SceneDetailScrubberComponent;
  let fixture: ComponentFixture<SceneDetailScrubberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneDetailScrubberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneDetailScrubberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
