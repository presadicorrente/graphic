import { TestBed } from '@angular/core/testing';

import { DasboardHttp } from './dasboard-http';

describe('DasboardHttp', () => {
  let service: DasboardHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasboardHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
