import { TestBed, inject } from '@angular/core/testing';

import { StashService } from './stash.service';

describe('StashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StashService]
    });
  });

  it('should be created', inject([StashService], (service: StashService) => {
    expect(service).toBeTruthy();
  }));
});
