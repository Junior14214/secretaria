import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoDeDadosComponent } from './alteracao-de-dados.component';

describe('AlteracaoDeDadosComponent', () => {
  let component: AlteracaoDeDadosComponent;
  let fixture: ComponentFixture<AlteracaoDeDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteracaoDeDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoDeDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
