import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QstDataGridComponent } from './qst-data-grid.component';

describe('QstDataGridComponent', () => {
  let component: QstDataGridComponent;
  let fixture: ComponentFixture<QstDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QstDataGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QstDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
