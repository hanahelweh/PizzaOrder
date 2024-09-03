import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({pizzaId,currentQtyById}) {
    const dispatch=useDispatch();
    return (
        <div className="flex justify-center items-center mb-2 gap-2">
            <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <div className="font-bold text-xs">{currentQtyById}</div>
            <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity
