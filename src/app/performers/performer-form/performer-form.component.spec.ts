import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerFormComponent } from './performer-form.component';

describe('PerformerFormComponent', () => {
  let component: PerformerFormComponent;
  let fixture: ComponentFixture<PerformerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
