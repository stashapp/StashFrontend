import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneDetailMarkerManagerComponent } from './scene-detail-marker-manager.component';

describe('SceneDetailMarkerManagerComponent', () => {
  let component: SceneDetailMarkerManagerComponent;
  let fixture: ComponentFixture<SceneDetailMarkerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneDetailMarkerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneDetailMarkerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
