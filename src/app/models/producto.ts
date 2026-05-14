export interface Producto {
  id: number;
  name: string;
  stock: number;
  created_at: string;
}

export interface ProductoCreate {
  name: string;
  stock: number;
}

export interface ProductoUpdate {
  name?: string;
  stock?: number;
}
