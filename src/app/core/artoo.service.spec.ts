import { TestBed, inject } from '@angular/core/testing';

import { ArtooService } from './artoo.service';

describe('ArtooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtooService]
    });
  });

  it('should be created', inject([ArtooService], (service: ArtooService) => {
    expect(service).toBeTruthy();
  }));
});
