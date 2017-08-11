import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneWallComponent } from './scene-wall.component';

describe('SceneWallComponent', () => {
  let component: SceneWallComponent;
  let fixture: ComponentFixture<SceneWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
