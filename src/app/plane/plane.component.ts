import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { concatMap, fromEvent, Observable, switchMap, tap, map, finalize } from 'rxjs';
import { MarkAnimationComponent } from '../mark-animation/mark-animation.component';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent implements OnInit {
  @ViewChild('plane', { read: ElementRef }) planeRef!: ElementRef;
  @ViewChild('planePosition', { read: ElementRef }) planePositionRef!: ElementRef;

  originX = 0;
  originY = 0;

  constructor(private view: ViewContainerRef) { }

  ngOnInit(): void {
   
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        tap(() => {
          if (this.originX === 0 && this.originY === 0) {
            const { planeX, planeY } = this.getPlanePosition();
            this.originX = planeX;
            this.originY = planeY;
          }
        }),
        map((event) => {
          const {clientX:clickX, clientY:clickY} = event;
          const componentRef = this.createMarkAnimation(clickX, clickY);
          return {event, componentRef};
        }),
        concatMap(({event,componentRef}) => {
          const {clientX:clickX, clientY:clickY} = event;
          return this.takeRotation$(clickX, clickY).pipe(
            switchMap(() => this.takeTranslate$(clickX, clickY)),
            finalize(() => { 
              componentRef.destroy(); 
            })
          );
        })
      )
      .subscribe((event) => { });
  }

  takeRotation$(clickX: number, clickY: number) {
    return new Observable((observer) => {
      const planeElement = this.planeRef.nativeElement;
      const clientRect = planeElement.getBoundingClientRect();
      const { planeX, planeY } = this.getPlanePosition();

      const diffX = clickX - planeX;
      const diffY = clickY - planeY;

      const angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
      let calAngle = Math.ceil(angle) + 90;

      planeElement.style.transform = `rotate(${calAngle}deg)`;
      const timeoutIndex = setTimeout(() => {
        observer.next();
        observer.complete();
      }, 1000);

      return () => clearTimeout(timeoutIndex);
    });
  }

  takeTranslate$(clickX: number, clickY: number) {
    return new Observable((observer) => {
      const planePositionElement = this.planePositionRef.nativeElement;
      const { planeX, planeY } = this.getPlanePosition();

      const diffX = clickX - this.originX;
      const diffY = clickY - this.originY;

      planePositionElement.style.transform = `translate(${diffX}px, ${diffY}px)`;


      const timeoutIndex = setTimeout(() => {
        observer.next();
        observer.complete();
      }, 1000);

      return () => clearTimeout(timeoutIndex);
    });
  }

  createMarkAnimation(x:number, y:number) {
    const componentRef = this.view.createComponent(MarkAnimationComponent);
    componentRef.instance.x = x;
    componentRef.instance.y = y;
    return componentRef;
  }

  getPlanePosition() {
    const planeElement = this.planeRef.nativeElement;
    const clientRect = planeElement.getBoundingClientRect();
    const planeX = clientRect.x + clientRect.width / 2;
    const planeY = clientRect.y + clientRect.height / 2;
    return { planeX, planeY };
  }

}
