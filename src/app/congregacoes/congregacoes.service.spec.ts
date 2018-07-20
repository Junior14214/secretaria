import { TestBed, inject } from '@angular/core/testing';

import { CongregacoesService } from './congregacoes.service';

describe('CongregacoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongregacoesService]
    });
  });

  it('should be created', inject([CongregacoesService], (service: CongregacoesService) => {
    expect(service).toBeTruthy();
  }));
});
