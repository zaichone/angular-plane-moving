import { parseHostBindings } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mark-animation',
  templateUrl: './mark-animation.component.html',
  styleUrls: ['./mark-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkAnimationComponent implements OnInit {
   @Input() set x(x:number){
    this.left = `${x-40}px`;
  }
  @Input() set y(y:number){
    this.top = `${y-40}px`;
  }
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.top') top = '0px';
  @HostBinding('style.left') left = '0px';

  constructor() { }

  ngOnInit(): void {}

}
