import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { EncodeBase64Directive } from '../directives/encode-base64.directive';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { MinDateDirective } from '../directives/min-date.directive';

@Component({
  selector: 'product-form',
  imports: [FormsModule, EncodeBase64Directive, MinDateDirective, DatePipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  newProduct: Product = {
    description: '',
    available: '',
    price: 0,
    imageUrl: '',
    rating: 1,
  };

  hoy = new Date().toISOString().split("T")[0];
  sending = signal(false);

  productsService = inject(ProductsService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  addProduct() {
    this.sending.set(true);
    this.productsService
      .addProduct(this.newProduct)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (product) => this.router.navigate(['/products']),
        error: (error) => alert('Ha ocurrido un error añadiendo producto'),
      }).add(() => this.sending.set(false));
  }
}