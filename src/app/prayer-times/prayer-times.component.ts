import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { PrayerTimesService } from '../services/prayer.service';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prayer-times',
  standalone: true,

  imports: [
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    CommonModule
  ],

  templateUrl: './prayer-times.component.html',
  styleUrl: './prayer-times.component.css'
})

export class PrayerTimesComponent {

  cities: String[] = [
    "Sousse"
  ]

  selectedCity: string = '';

  currentDate: string;

  constructor(private prayTimeApiService: PrayerTimesService) {
    this.currentDate = this.getCurrentDate();
  }

  getCurrentDate(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date();
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }

  data: any;

  dataSource: {name: string, time: any}[] = [ ];

  onCitySelected() {
    // Use this.selectedCity and this.selectedDate for further processing
    this.prayTimeApiService.getPrayerTimes(this.selectedCity).subscribe((response) => {
      this.data = response;

      Object.entries(this.data.data.timings).forEach(([name, time]) => {
        this.dataSource.push({ name, time });
      });

      console.log(this.dataSource);
    });
  }

  displayedColumns: string[] = ['prayer', 'time'];

}
