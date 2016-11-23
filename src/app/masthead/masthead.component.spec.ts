/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MastheadComponent } from './masthead.component';

describe('Component: Masthead', () => {
  it('should create an instance', () => {
    let component = new MastheadComponent();
    expect(component).toBeTruthy();
  });

  it('should init successfully', () => {
    let component = new MastheadComponent();
    let spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
