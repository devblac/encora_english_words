import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWordsComponent } from './form-words.component';

describe('FormWords', () => {
  let component: FormWordsComponent;
  let fixture: ComponentFixture<FormWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormWordsComponent]
    });
    fixture = TestBed.createComponent(FormWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
