import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProduct } from 'src/app/interfaces/product.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  total: number = 0;
  myShoppingCar: Product[] = [];
  products: Product[] = [];
  today: Date = new Date();
  date: Date = new Date(2003, 2, 2);
  showProducDetaild: boolean = false;
  limit: number = 10;
  offset: number = 0;
  productDetail: Product = {
    id: 0,
    category: {
      id: 0,
      name:'',
      typeImg: ''
    },
    description: '',
    images:[],
    price: 0,
    title: ''
  };

  constructor(
    private storeService: StoreService,
    private productService: ProductosService
  ) {
    this.myShoppingCar = this.storeService.getShoppingCar();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  addProduct(product: Product) {
    this.storeService.addProducto(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProducDetaild = !this.showProducDetaild;
  }

  showDetail(id: number) {
    this.productService.getProducto(id)
      .subscribe( producto => {
        this.toggleProductDetail();
        this.productDetail = producto;
      })
  }

  createProduct() {
    const producto: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Este es un nuevo producto',
      images: [''],
      price: 1000,
      categoryId: 1
    }

    this.productService.createProduct(producto)
      .subscribe( producto => {
        this.products.unshift(producto);
      });
  }

  updateProduct() {
    const producto: UpdateProduct = {
      title: 'Nuevo Titulo',
      description: 'Este es una nueva description del producto',
      price: 1000,
      categoryId: 1
    }
    const id = this.productDetail.id;
    this.productService.update(producto, id)
      .subscribe( producto => {
        this.toggleProductDetail();
        const index = this.products.findIndex(product => product.id === id);
        this.products[index] = producto;
      });
  }

  deleteProduct() {
    const id = this.productDetail.id;
    this.productService.delete(id)
      .subscribe( producto => {
        this.toggleProductDetail();
        const index = this.products.findIndex(product => product.id === id);
        this.products.splice(index, 1);
        alert('Product deleted');
      });
  }

  readAndUpdate(id : number) {
    this.productService.getProducto(id)
    .pipe(
      switchMap((product) => this.productService.update({title: 'change'}, product.id)),
      // switchMap((product) => this.productService.update({title: 'change'}, product.id)),
      // switchMap((product) => this.productService.update({title: 'change'}, product.id))
    )
    .subscribe(producto => {
      console.log(producto)
    });

    this.productService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const [ read, update ] = response;
      console.log(read, update);
    })
  }

  loadMore() {
    this.productService.getProductos(this.offset, this.limit)
      .subscribe( productos => {
        this.products = this.products.concat(productos);
        this.offset += this.limit;
      })
  }
}
