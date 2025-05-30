import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevaiComponent } from './devai.component';

describe('DevaiComponent', () => {
  let component: DevaiComponent;
  let fixture: ComponentFixture<DevaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
