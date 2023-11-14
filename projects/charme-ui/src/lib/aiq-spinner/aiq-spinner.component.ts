import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aiq-spinner',
  templateUrl: './aiq-spinner.component.html',
  styleUrls: ['./aiq-spinner.component.scss'],
  standalone: true
})
export class AiqSpinnerComponent implements OnInit {

  @Input() diameter: number = 20;
  constructor() { }

  ngOnInit(): void {
  }

}
