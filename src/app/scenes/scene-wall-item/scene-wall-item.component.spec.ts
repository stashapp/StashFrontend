import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneWallItemComponent } from './scene-wall-item.component';

describe('SceneWallItemComponent', () => {
  let component: SceneWallItemComponent;
  let fixture: ComponentFixture<SceneWallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneWallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneWallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
