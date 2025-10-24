import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosConfig } from './parametros-config';

describe('ParametrosConfig', () => {
  let component: ParametrosConfig;
  let fixture: ComponentFixture<ParametrosConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrosConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
