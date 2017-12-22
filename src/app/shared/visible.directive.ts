import { Directive, ElementRef, Output, AfterViewInit, OnDestroy, EventEmitter, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';

import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[visible]'
})
export class VisibleDirective {

  @Output()
  visibleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  scrollSubscription: Subscription;
  resizeSubscription: Subscription;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: any) {}

  ngAfterViewInit(){
    this.subscribe();
  }
  ngOnDestroy(){
    this.unsubscribe();
  }

  subscribe() {
    this.scrollSubscription = Observable.fromEvent(window, 'scroll')
                                        .startWith(null)
                                        .debounceTime(2000)
                                        .subscribe(() => {
      this.visibleEvent.emit(this.isInViewport());
    });
    this.resizeSubscription = Observable.fromEvent(window, 'resize')
                                        .startWith(null)
                                        .debounceTime(2000)
                                        .subscribe(() => {
      this.visibleEvent.emit(this.isInViewport());
    });
  }
  unsubscribe() {
    if (this.scrollSubscription) { this.scrollSubscription.unsubscribe(); }
    if (this.resizeSubscription) { this.resizeSubscription.unsubscribe(); }
  }

  isInViewport(): boolean {
    const rect = this.element.nativeElement.getBoundingClientRect();
    const html = this.document.documentElement;
    const bufferSpace = 400;
    return rect.top >= -(bufferSpace) &&
           rect.left >= 0 &&
           rect.bottom <= (window.innerHeight + bufferSpace || html.clientHeight + bufferSpace) &&
           rect.right <= (window.innerWidth || html.clientWidth);
  }

}
