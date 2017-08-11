import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneListComponent } from './scene-list.component';

describe('SceneListComponent', () => {
  let component: SceneListComponent;
  let fixture: ComponentFixture<SceneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
