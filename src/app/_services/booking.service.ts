import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseUrl: string = 'http://localhost:7000/flightbooking/';

  constructor(private http: HttpClient) {}

  searchAirlines(from: string, to: string) {
    return this.http.get(this.baseUrl + 'search/', {
      params: {
        from: from,
        to: to,
      },
    });
  }

  bookFlight(data: any) {
    return this.http.post(this.baseUrl + 'bookings/', data);
  }

  getBookingByPnr(pnr: any) {
    return this.http.get(this.baseUrl + `bookings/${pnr}`);
  }

  getAirlineSchedule(id: any) {
    return this.http.get(this.baseUrl + `search/${id}`);
  }

  cancelTicket(pnr: any) {
    return this.http.delete(this.baseUrl + `bookings/${pnr}`);
  }

  getPassengers(bookingId: any) {
    return this.http.get(this.baseUrl + `bookings/passengers/${bookingId}`);
  }

  getAllBookings() {
    return this.http.get(this.baseUrl + `bookings/`);
  }
}
