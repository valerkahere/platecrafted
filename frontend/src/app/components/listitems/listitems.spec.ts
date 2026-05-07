import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listitems } from './listitems';

describe('Listitems', () => {
  let component: Listitems;
  let fixture: ComponentFixture<Listitems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listitems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listitems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
