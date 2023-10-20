import { TestBed } from '@angular/core/testing';

import { WordSharedService } from './word-shared.service';

describe('WordSharedService', () => {
  let service: WordSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
