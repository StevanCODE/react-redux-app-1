// import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { putCart } from '../../services';
// import { cartActions } from '../../store/cart';
import { loadCartData, putCartData } from '../../store/cart';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';


const Cart = () => {
  const cart = useSelector((store) => store.cart.items)
  const [cartLoaded, setCartLoaded] = useState(false)
  const dispatch = useDispatch()

  // Thunk se prosledjuje dispatchu tako da ne moras da pravis custom funkcije za dispatch
  // const handleUpdate = useCallback((data) => {
  //   dispatch(cartActions.addCart(data))
  // },[dispatch])


  useEffect(() => {
    // THUNK FUNCKIJE
    if(cart.length > 0){
      dispatch(putCartData(cart))
      // putCart(cart, 'https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
    }
    else if(cart.length === 0 && !cartLoaded){
      setCartLoaded(true)
      dispatch(loadCartData())
      // Thunk funckija od gore zamenjuje ovu funkciju dole
      // getMeals(handleUpdate, (msg) => console.log(msg), 'https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
    }
    else if(cart.length === 0 && cartLoaded){
      dispatch(putCartData([]))
      // putCart([], 'https://react-http-ae815-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
      
    }
  },[cart, cartLoaded,dispatch])

  const items = cart.map(item => <CartItem key={item.id} item={{name:item.name, quantity:item.quantity ? item.quantity : 1, price:item.price, total:item.price*(item.quantity ? item.quantity : 1), id:item.id}}/>)
  
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items}
      </ul>
      <p>Cart Total: ${cart.reduce((a,b) => a + b.price * b.quantity, 0)}</p>
    </Card>
  );
};

export default Cart;
