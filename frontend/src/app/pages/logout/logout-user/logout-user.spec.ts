import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUser } from './logout-user';

describe('LogoutUser', () => {
  let component: LogoutUser;
  let fixture: ComponentFixture<LogoutUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
