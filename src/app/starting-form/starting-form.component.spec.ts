/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartingFormComponent } from './starting-form.component';

describe('StartingFormComponent', () => {
  let component: StartingFormComponent;
  let fixture: ComponentFixture<StartingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
