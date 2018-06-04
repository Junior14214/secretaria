import { TestBed, inject } from '@angular/core/testing';

import { MembroService } from './membro.service';

describe('MembroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembroService]
    });
  });

  it('should be created', inject([MembroService], (service: MembroService) => {
    expect(service).toBeTruthy();
  }));
});
