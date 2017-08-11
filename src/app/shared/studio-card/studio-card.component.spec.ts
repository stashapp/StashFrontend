import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioCardComponent } from './studio-card.component';

describe('StudioCardComponent', () => {
  let component: StudioCardComponent;
  let fixture: ComponentFixture<StudioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
