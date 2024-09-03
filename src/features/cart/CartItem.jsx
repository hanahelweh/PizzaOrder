import { useSelector } from 'react-redux';
import {formatCurrency} from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import { getCurrentQtyById } from './cartSlice';
import UpdateItemQuantity from './UpdateItemQuantity';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const isInTheCart=useSelector(getCurrentQtyById(pizzaId));
  const currentQtyById=useSelector(getCurrentQtyById(pizzaId));
    return (
      <li className='flex justify-between items-center my-auto py-6'>
        <p>
          <span className='font-bold'>{quantity}&times;</span>
          <span className='font-medium'>{name}</span>
        </p>
        <div>
          {isInTheCart!==0 && <div className='inline-block mr-5'><UpdateItemQuantity pizzaId={pizzaId} currentQtyById={currentQtyById}/></div>}
          <p className='font-semibold inline-block'>{formatCurrency(totalPrice)}</p>
          <div className='inline-block ml-2'>
            <DeleteItem id={pizzaId}/>
          </div>
        </div>
      </li>
    );
  }
  
  export default CartItem;
  