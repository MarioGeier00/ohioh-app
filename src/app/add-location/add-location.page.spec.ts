import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AddLocationPage} from './add-location.page';

describe('AddLocationPage', () => {
  let component: AddLocationPage;
  let fixture: ComponentFixture<AddLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
