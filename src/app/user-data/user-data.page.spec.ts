import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {UserDataPage} from './user-data.page';

describe('UserDataPage', () => {
  let component: UserDataPage;
  let fixture: ComponentFixture<UserDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
