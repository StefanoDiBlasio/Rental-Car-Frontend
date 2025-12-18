import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBookings } from './get-bookings';

describe('GetBookings', () => {
  let component: GetBookings;
  let fixture: ComponentFixture<GetBookings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetBookings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBookings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
