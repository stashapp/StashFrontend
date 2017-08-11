import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneFormComponent } from './scene-form.component';

describe('SceneFormComponent', () => {
  let component: SceneFormComponent;
  let fixture: ComponentFixture<SceneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
