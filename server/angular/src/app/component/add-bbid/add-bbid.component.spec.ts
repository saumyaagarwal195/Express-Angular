import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBbidComponent } from './add-bbid.component';

describe('AddBbidComponent', () => {
  let component: AddBbidComponent;
  let fixture: ComponentFixture<AddBbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
