import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly searchTerm = signal('');
  readonly selectedCategory = signal('');

  readonly categories = computed(() =>
    [...new Set(this.products().map((product) => product.category))],
  );

  readonly averageRating = computed(() => {
    const products = this.products();
    if (!products.length) {
      return '0.0';
    }

    const total = products.reduce((sum, product) => sum + product.rating.rate, 0);
    return (total / products.length).toFixed(1);
  });

  readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.products().filter((product) => {
      const matchesTerm = product.title.toLowerCase().includes(term);
      const matchesCategory = !category || product.category === category;
      return matchesTerm && matchesCategory;
    });
  });

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Nao foi possivel carregar os produtos.');
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
