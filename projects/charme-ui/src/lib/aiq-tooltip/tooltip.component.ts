import { Component, Inject, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { OVERLAY_DATA } from "../overlay";

@Component({
  selector: 'aiq-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent implements OnInit {

  constructor(@Inject(OVERLAY_DATA) public data: {text: string, tpl: TemplateRef<any>, containerClass: string}) {
  }

  ngOnInit(): void {
  }
}
