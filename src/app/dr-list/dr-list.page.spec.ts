import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrListPage } from './dr-list.page';

describe('DrListPage', () => {
  let component: DrListPage;
  let fixture: ComponentFixture<DrListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
