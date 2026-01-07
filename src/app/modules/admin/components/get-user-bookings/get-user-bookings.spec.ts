import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserBookings } from './get-user-bookings';

describe('GetUserBookings', () => {
  let component: GetUserBookings;
  let fixture: ComponentFixture<GetUserBookings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUserBookings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUserBookings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
