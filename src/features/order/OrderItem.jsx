import {formatCurrency} from '../../utils/helpers'
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  console.log(ingredients)
    const { quantity, name, totalPrice } = item;
  
    return (
      <li className='flex justify-between my-auto py-6'>
          <div>
            <span className='font-bold'>{quantity}&times;</span>
            <span className='font-medium'>{name}</span>
            <p className='italic text-sm text-slate-400'>{!isLoadingIngredients ? ingredients.join(', '):'Loading..'}</p>
          </div>
          <div>
            <p className='font-semibold'>{formatCurrency(totalPrice)}</p>
          </div>
      </li>
    );
  }
  
  export default OrderItem;
  