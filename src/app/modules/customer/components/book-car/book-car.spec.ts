import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCar } from './book-car';

describe('BookCar', () => {
  let component: BookCar;
  let fixture: ComponentFixture<BookCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
