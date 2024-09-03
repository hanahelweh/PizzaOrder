import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem'
import { Link } from 'react-router-dom';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const userName=useSelector(state=>state.user.username);
  const cart=useSelector(getCart)
  const dispatch=useDispatch();
  function handleClearCart(){
    dispatch(clearCart())
  }
  if(!cart.length) return (
    <div className='max-w-5xl p-5 mx-auto text-center mt-10'>
      <div>Your Cart Is Empty, Check Our Menu</div>
      <Link to="/menu" className="link">&larr; Back to menu</Link>
    </div>
  )
  return (
    <div className='max-w-5xl p-5 mx-auto'>
      <Link to="/menu" className="link">&larr; Back to menu</Link>

      <h2 className='my-3'>Your cart, {userName}</h2>
      <ul className='flex flex-col divide-y-2'>
        {cart.map((item)=>(<CartItem item={item} key={item.key}/>))}
      </ul>
      <div className='mt-6 flex gap-2'>
        <Button to="/order/new" type='primary'>Order pizzas</Button>
        <Button type='secondary' onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
