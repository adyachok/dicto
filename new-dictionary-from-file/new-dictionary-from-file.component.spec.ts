import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDictionaryFromFileComponent } from './new-dictionary-from-file.component';

describe('NewDictionaryFromFileComponent', () => {
  let component: NewDictionaryFromFileComponent;
  let fixture: ComponentFixture<NewDictionaryFromFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDictionaryFromFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDictionaryFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
