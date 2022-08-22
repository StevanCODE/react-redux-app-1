import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart';

const ProductItem = (props) => {
  const { name, price, description, id } = props;
  const dispatch = useDispatch()

  const handleClick = () => {
    const item = {name, description, price, quantity:1, id}
    dispatch(cartActions.addItem(item))
    dispatch(cartActions.toggleCart(true))
  }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleClick}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
