import { TestBed, inject } from '@angular/core/testing';

import { PerformersService } from './performers.service';

describe('PerformersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformersService]
    });
  });

  it('should be created', inject([PerformersService], (service: PerformersService) => {
    expect(service).toBeTruthy();
  }));
});
