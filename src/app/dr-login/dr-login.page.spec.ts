import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrLoginPage } from './dr-login.page';

describe('DrLoginPage', () => {
  let component: DrLoginPage;
  let fixture: ComponentFixture<DrLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
