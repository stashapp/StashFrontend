import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerDetailComponent } from './performer-detail.component';

describe('PerformerDetailComponent', () => {
  let component: PerformerDetailComponent;
  let fixture: ComponentFixture<PerformerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
