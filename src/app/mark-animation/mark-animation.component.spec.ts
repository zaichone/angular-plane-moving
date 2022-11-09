import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAnimationComponent } from './mark-animation.component';

describe('MarkAnimationComponent', () => {
  let component: MarkAnimationComponent;
  let fixture: ComponentFixture<MarkAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
