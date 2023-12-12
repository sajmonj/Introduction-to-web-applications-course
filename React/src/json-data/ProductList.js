import Product from './Product'

const ProductList = ({ products, onUpdateProduct }) => {
    return (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Product product={product} onUpdateProduct={onUpdateProduct}/>
            </li>
          ))}
        </ul>
      );
}

export default ProductList;