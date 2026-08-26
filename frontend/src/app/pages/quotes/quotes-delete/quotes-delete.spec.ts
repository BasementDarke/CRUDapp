import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesDelete } from './quotes-delete';

describe('QuotesDelete', () => {
  let component: QuotesDelete;
  let fixture: ComponentFixture<QuotesDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
