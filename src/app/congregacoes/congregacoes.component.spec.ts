import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacoesComponent } from './congregacoes.component';

describe('CongregacoesComponent', () => {
  let component: CongregacoesComponent;
  let fixture: ComponentFixture<CongregacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
