import { TestBed } from '@angular/core/testing';

import { InterceptorSpringbootInterceptor } from './interceptor-springboot.interceptor';

describe('InterceptorSpringbootInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorSpringbootInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorSpringbootInterceptor = TestBed.inject(InterceptorSpringbootInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
