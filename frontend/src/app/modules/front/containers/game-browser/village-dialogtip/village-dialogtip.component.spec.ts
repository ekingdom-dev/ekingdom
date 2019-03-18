import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageDialogtipComponent } from './village-dialogtip.component';

describe('VillageDialogtipComponent', () => {
  let component: VillageDialogtipComponent;
  let fixture: ComponentFixture<VillageDialogtipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageDialogtipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageDialogtipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
