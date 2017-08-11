import { TestBed, inject } from '@angular/core/testing';

import { GalleriesService } from './galleries.service';

describe('GalleriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleriesService]
    });
  });

  it('should be created', inject([GalleriesService], (service: GalleriesService) => {
    expect(service).toBeTruthy();
  }));
});
