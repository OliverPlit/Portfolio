import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingWithOthersComponent } from './working-with-others.component';

describe('WorkingWithOthersComponent', () => {
  let component: WorkingWithOthersComponent;
  let fixture: ComponentFixture<WorkingWithOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingWithOthersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingWithOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
