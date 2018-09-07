import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoDeSenhaComponent } from './alteracao-de-senha.component';

describe('AlteracaoDeSenhaComponent', () => {
  let component: AlteracaoDeSenhaComponent;
  let fixture: ComponentFixture<AlteracaoDeSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteracaoDeSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoDeSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
