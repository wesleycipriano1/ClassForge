import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTerminalComponent } from './animated-terminal.component';

describe('AnimatedTerminalComponent', () => {
  let component: AnimatedTerminalComponent;
  let fixture: ComponentFixture<AnimatedTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedTerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
