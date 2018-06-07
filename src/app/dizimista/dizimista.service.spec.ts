import { TestBed, inject } from '@angular/core/testing';

import { DizimistaService } from './dizimista.service';

describe('DizimistaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DizimistaService]
    });
  });

  it('should be created', inject([DizimistaService], (service: DizimistaService) => {
    expect(service).toBeTruthy();
  }));
});
