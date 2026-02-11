import { TestBed } from '@angular/core/testing';

import { DasboardSocket } from './dasboard-socket';

describe('DasboardSocket', () => {
  let service: DasboardSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasboardSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
