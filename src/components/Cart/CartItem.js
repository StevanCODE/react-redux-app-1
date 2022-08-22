import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart';
const CartItem = (props) => {
  const { name, quantity, total, price, id } = props.item;
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(cartActions.increment(id))
  }
  const handleDecrement = () => {
    dispatch(cartActions.decrement(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          total: ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
