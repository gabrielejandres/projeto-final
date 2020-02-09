import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardRepublicComponent } from './card-republic.component';

describe('CardRepublicComponent', () => {
  let component: CardRepublicComponent;
  let fixture: ComponentFixture<CardRepublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRepublicComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardRepublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
