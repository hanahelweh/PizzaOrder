import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import {formatCurrency} from '../../utils/helpers'
function CartOverview() {
    const pizzaNbs=useSelector(getTotalCartQuantity);
    const cartPrice=useSelector(getTotalCartPrice);
    if(!pizzaNbs) return null;
    return (
        <div className="mt-6 max-w-5xl px-5 mx-auto text-center">
            <div className="sm:text-lg text-sm">
                <span className="mr-2">{pizzaNbs} pizzas</span>
                <span className="font-bold">{formatCurrency(cartPrice)}</span>
            </div>
            <Link to="/cart" className="link">Open cart</Link>
        </div>
    )
}

export default CartOverview
