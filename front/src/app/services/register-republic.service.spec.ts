import { TestBed } from '@angular/core/testing';

import { RegisterRepublicService } from './register-republic.service';

describe('RegisterRepublicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterRepublicService = TestBed.get(RegisterRepublicService);
    expect(service).toBeTruthy();
  });
});
