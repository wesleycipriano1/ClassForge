import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarClasseComponent } from './criar-classe.component';

describe('CriarClasseComponent', () => {
  let component: CriarClasseComponent;
  let fixture: ComponentFixture<CriarClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarClasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
