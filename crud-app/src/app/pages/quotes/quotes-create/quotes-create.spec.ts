import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesCreate } from './quotes-create';

describe('QuotesCreate', () => {
  let component: QuotesCreate;
  let fixture: ComponentFixture<QuotesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
