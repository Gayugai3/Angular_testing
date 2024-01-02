import { TestBed } from '@angular/core/testing';

import { TutorialService } from './tutorial.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
