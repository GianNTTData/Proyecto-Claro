import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoEditar } from './motivo-editar';

describe('MotivoEditar', () => {
  let component: MotivoEditar;
  let fixture: ComponentFixture<MotivoEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
