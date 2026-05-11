import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alphabet } from './alphabet';

describe('Alphabet', () => {
  let component: Alphabet;
  let fixture: ComponentFixture<Alphabet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alphabet],
    }).compileComponents();

    fixture = TestBed.createComponent(Alphabet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
