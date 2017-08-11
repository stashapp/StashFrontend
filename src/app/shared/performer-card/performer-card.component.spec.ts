import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerCardComponent } from './performer-card.component';

describe('PerformerCardComponent', () => {
  let component: PerformerCardComponent;
  let fixture: ComponentFixture<PerformerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
