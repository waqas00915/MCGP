import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrPage } from './add-dr.page';

describe('AddDrPage', () => {
  let component: AddDrPage;
  let fixture: ComponentFixture<AddDrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
