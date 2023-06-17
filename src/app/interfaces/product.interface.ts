export interface Product {
  id:          number;
  title:       string;
  price:       number;
  description: string;
  category:    Category;
  images:      string[];
  taxes?: number;
}

export interface Category {
  id:      number;
  name:    string;
  typeImg: string;
}

// Traer todo, pero omitir id y category
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId:  number;
}

// hacer todos opcionales
export interface UpdateProduct extends Partial<CreateProductDTO> {

}
