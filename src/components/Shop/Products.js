import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMeals } from '../../services';
import { useDispatch } from 'react-redux';
import { productActions } from '../../store/products';
import { useCallback } from 'react';


const Products = (props) => {
  const products = useSelector((store) => store.products.items)
  const dispatch = useDispatch()
  
  const handleUpdate = useCallback((data) => {
    dispatch(productActions.addCart(data))
  },[dispatch])

  useEffect(() => {
    getMeals(handleUpdate, (msg)=> console.log(msg))
  },[handleUpdate])
  
  const items = products.map(item => <ProductItem key={item.id} id={item.id} name={item.name} price={parseInt(item.price)} description={item.description} />)
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items}
      </ul>
    </section>
  );
};

export default Products;
