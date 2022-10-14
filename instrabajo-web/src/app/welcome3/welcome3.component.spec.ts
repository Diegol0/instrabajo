import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Welcome3Component } from './welcome3.component';

describe('Welcome3Component', () => {
  let component: Welcome3Component;
  let fixture: ComponentFixture<Welcome3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Welcome3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Welcome3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
