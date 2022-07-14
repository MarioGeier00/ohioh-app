import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InfectionWarningPage} from './infection-warning.page';

describe('InfectionWarningPage', () => {
  let component: InfectionWarningPage;
  let fixture: ComponentFixture<InfectionWarningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionWarningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfectionWarningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
