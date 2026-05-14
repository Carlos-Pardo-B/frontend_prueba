import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  private readonly service = inject(ProductoService);

  productos = signal<Producto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  showModal = signal(false);
  editingId = signal<number | null>(null);
  saving = signal(false);

  formData = { name: '', stock: 0 };

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.service.getAll().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar productos. Verifica la conexión al servidor.');
        this.loading.set(false);
      },
    });
  }

  openCreate() {
    this.editingId.set(null);
    this.formData = { name: '', stock: 0 };
    this.showModal.set(true);
  }

  openEdit(p: Producto) {
    this.editingId.set(p.id);
    this.formData = { name: p.name, stock: p.stock };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  save() {
    if (!this.formData.name.trim()) return;
    const id = this.editingId();
    this.saving.set(true);
    const obs = id
      ? this.service.update(id, this.formData)
      : this.service.create(this.formData);

    obs.subscribe({
      next: () => {
        this.saving.set(false);
        this.showModal.set(false);
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Error al guardar el producto.');
      },
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Error al eliminar el producto.'),
    });
  }
}
