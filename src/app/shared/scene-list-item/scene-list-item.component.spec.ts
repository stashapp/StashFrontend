import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneListItemComponent } from './scene-list-item.component';

describe('SceneListItemComponent', () => {
  let component: SceneListItemComponent;
  let fixture: ComponentFixture<SceneListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
