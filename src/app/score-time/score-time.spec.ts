import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTime } from './score-time';

describe('ScoreTime', () => {
  let component: ScoreTime;
  let fixture: ComponentFixture<ScoreTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
