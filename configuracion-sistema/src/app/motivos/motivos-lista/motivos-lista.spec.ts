import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivosLista } from './motivos-lista';

describe('MotivosLista', () => {
  let component: MotivosLista;
  let fixture: ComponentFixture<MotivosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivosLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
