import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualizarMembroComponent } from './contextualizar-membro.component';

describe('ContextualizarMembroComponent', () => {
  let component: ContextualizarMembroComponent;
  let fixture: ComponentFixture<ContextualizarMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualizarMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualizarMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
