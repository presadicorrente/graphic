import { TestBed } from '@angular/core/testing';

import { DashboardHttp } from './dasboard-http';

describe('DasboardHttp', () => {
  let service: DashboardHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
