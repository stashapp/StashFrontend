import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneMarkerCardComponent } from './scene-marker-card.component';

describe('SceneMarkerCardComponent', () => {
  let component: SceneMarkerCardComponent;
  let fixture: ComponentFixture<SceneMarkerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneMarkerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneMarkerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
