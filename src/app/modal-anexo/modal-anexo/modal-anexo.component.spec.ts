import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnexoComponent } from './modal-anexo.component';

describe('ModalAnexoComponent', () => {
  let component: ModalAnexoComponent;
  let fixture: ComponentFixture<ModalAnexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAnexoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
