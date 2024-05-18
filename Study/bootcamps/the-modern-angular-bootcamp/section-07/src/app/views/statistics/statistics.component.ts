import { Component, Input } from '@angular/core';

export interface StatsType {
  value: string;
  label: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  @Input('data') stats: StatsType | any = [];
}
