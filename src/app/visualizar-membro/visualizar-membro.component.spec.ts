import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarMembroComponent } from './visualizar-membro.component';

describe('VisualizarMembroComponent', () => {
  let component: VisualizarMembroComponent;
  let fixture: ComponentFixture<VisualizarMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
