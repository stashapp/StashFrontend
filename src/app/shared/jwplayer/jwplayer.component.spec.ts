import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwplayerComponent } from './jwplayer.component';

describe('JwplayerComponent', () => {
  let component: JwplayerComponent;
  let fixture: ComponentFixture<JwplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
