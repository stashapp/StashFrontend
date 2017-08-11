import { TestBed, inject } from '@angular/core/testing';

import { StudiosService } from './studios.service';

describe('StudiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudiosService]
    });
  });

  it('should be created', inject([StudiosService], (service: StudiosService) => {
    expect(service).toBeTruthy();
  }));
});
