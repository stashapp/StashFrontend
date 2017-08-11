import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneCardComponent } from './scene-card.component';

describe('SceneCardComponent', () => {
  let component: SceneCardComponent;
  let fixture: ComponentFixture<SceneCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
