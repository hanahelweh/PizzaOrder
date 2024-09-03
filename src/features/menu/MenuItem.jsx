import {formatCurrency} from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQtyById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    const dispatch=useDispatch();
    const isInTheCart=useSelector(getCurrentQtyById(id));

    function handleAddToCart(){
      const newItem={
        pizzaId:id,
        name,
        unitPrice,
        quantity:1,
        totalPrice:1*unitPrice
      };
      dispatch(addItem(newItem))
    }
    return (
      <div className="basis-1/2 text-center p-6">
        <div className={`rounded-full w-full max-w-44 mx-auto aspect-square bg-contain ${soldOut ? 'opacity-70 grayscale' : ''}`} style={{backgroundImage:`url('${imageUrl}')`}} alt={name} />
        <div className="mt-3">
          <p className="font-bold">{name}</p>
          <p className='italic'>{ingredients.join(', ')}</p>
          <div className='text-red-700 font-bold mb-2'>
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-slate-600">Sold out</p>}
          </div>
          {!soldOut ? !isInTheCart ? <Button type="mini" onClick={handleAddToCart}>Add to cart</Button>:<DeleteItem id={id}/>:''}
        </div>
      </div>
    );
  }
  
  export default MenuItem;
  