import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDelete } from './books-delete';

describe('BooksDelete', () => {
  let component: BooksDelete;
  let fixture: ComponentFixture<BooksDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
