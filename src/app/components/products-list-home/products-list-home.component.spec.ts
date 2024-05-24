import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListHomeComponent } from './products-list-home.component';

describe('ProductsListHomeComponent', () => {
  let component: ProductsListHomeComponent;
  let fixture: ComponentFixture<ProductsListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
