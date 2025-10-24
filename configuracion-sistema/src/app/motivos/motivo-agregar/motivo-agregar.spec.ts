import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoAgregar } from './motivo-agregar';

describe('MotivoAgregar', () => {
  let component: MotivoAgregar;
  let fixture: ComponentFixture<MotivoAgregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoAgregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoAgregar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
