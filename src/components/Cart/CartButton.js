import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const items = useSelector((store) => store.cart.items)
  const itemQuantity = items.reduce((a,b) => a + b.quantity, 0)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(cartActions.toggleCart())
  }
  
  return (
    <button onClick={handleClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemQuantity}</span>
    </button>
  );
};

export default CartButton;
