import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aiq-progress',
  templateUrl: './aiq-progress-bar.component.html',
  styleUrls: ['./aiq-progress-bar.component.scss']
})
export class AiqProgressBarComponent implements OnInit {

  @Input() height: number = 10;
  @Input() diameter: number | string = 15;
  @Input() borderWidth = 5;
  @Input() progress: number = 100;
  @Input() type: 'intermediate' | 'infinite' = 'infinite';
  @Input() display: 'round' | 'flat' = 'flat'
  @Input() color: string = '#335FFF';


  constructor() { }

  ngOnInit(): void {
  }

}
