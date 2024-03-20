import { TestBed } from '@angular/core/testing';

import { SeatingService } from './seating.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeatingService', () => {
  let service: SeatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SeatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
