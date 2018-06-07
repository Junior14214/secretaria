import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DizimistaComponent } from './dizimista.component';

describe('DizimistaComponent', () => {
  let component: DizimistaComponent;
  let fixture: ComponentFixture<DizimistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DizimistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DizimistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
