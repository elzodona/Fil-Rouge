import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesdoneComponent } from './sesdone.component';

describe('SesdoneComponent', () => {
  let component: SesdoneComponent;
  let fixture: ComponentFixture<SesdoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesdoneComponent]
    });
    fixture = TestBed.createComponent(SesdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
