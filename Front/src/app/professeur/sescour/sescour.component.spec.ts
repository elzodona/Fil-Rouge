import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SescourComponent } from './sescour.component';

describe('SescourComponent', () => {
  let component: SescourComponent;
  let fixture: ComponentFixture<SescourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SescourComponent]
    });
    fixture = TestBed.createComponent(SescourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
