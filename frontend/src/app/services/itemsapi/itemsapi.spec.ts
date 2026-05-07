import { TestBed } from '@angular/core/testing';

import { Itemsapi } from './itemsapi';

describe('Itemsapi', () => {
  let service: Itemsapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Itemsapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
