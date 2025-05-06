import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCodigosComponent } from './historico-codigos.component';

describe('HistoricoCodigosComponent', () => {
  let component: HistoricoCodigosComponent;
  let fixture: ComponentFixture<HistoricoCodigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoCodigosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoCodigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
