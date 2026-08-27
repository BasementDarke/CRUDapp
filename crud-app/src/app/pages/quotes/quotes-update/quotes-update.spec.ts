import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesUpdate } from './quotes-update';

describe('QuotesUpdate', () => {
  let component: QuotesUpdate;
  let fixture: ComponentFixture<QuotesUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
