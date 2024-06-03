// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {
  // Define API endpoint
  private apiUrl = 'http://api.aladhan.com/v1/timingsByCity';

  constructor(private http: HttpClient) { }

  // Method to fetch prayer times by city, country, method, and date
  getPrayerTimes(city: string): Observable<any> {
    // Construct API URL with provided parameters
    const url = `${this.apiUrl}?city=${city}&country=TN&method=18`;

    // Make GET request to API
    return this.http.get<any>(url);
  }
}
