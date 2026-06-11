import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Nao foi possivel carregar o produto.');
        this.loading.set(false);
      },
    });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value * 5);
  }
}
