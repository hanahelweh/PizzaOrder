import { useState } from "react";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from '../../store';
import {formatCurrency} from '../../utils/helpers'
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
    const formErrors = useActionData();
    const navigation=useNavigation();
    const isSubmitting=navigation.state==='submitting';
    const {username,position,status:addressStatus,address,error:addressError} = useSelector(state=>state.user);
    console.log(useSelector(state=>state.user))
    const totalCartPrice=useSelector(getTotalCartPrice);
    const priorityPrice=withPriority?totalCartPrice*0.2:0;
    const dispatch = useDispatch();
    if(!cart.length) return (
      <div className='max-w-5xl p-5 mx-auto text-center mt-10'>
        <div>Your Cart Is Empty, Check Our Menu</div>
        <Link to="/menu" className="link">&larr; Back to menu</Link>
      </div>
    )
  return (
    <div className="max-w-xl px-5 py-16 mx-auto">
      <h2 className="text-red-700 font-bold text-2xl text-center">Ready to order? Lets go!</h2>
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input bg-slate-100 w-full" placeholder="First Name" type="text" name="customer" required defaultValue={username} />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input bg-slate-100 w-full" placeholder="Phone number" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <div className="text-xs text-red-700 bg-red-200 p-2 mt-2 rounded-xl">{formErrors.phone}</div>}
        </div>

        <div>
          <label>Address</label>
          <div className="flex gap-2">
            <div className="grow">
              <input className="input bg-slate-100 w-full" placeholder="Address" type="text" name="address" defaultValue={address} disabled={addressStatus==='loading'} required />
            </div>
            <Button className="w-20" type='mini' disabled={addressStatus==='loading'} onClick={(e)=>{e.preventDefault();dispatch(fetchAddress())}}>{addressStatus==='loading'?'Getting Your Location..':'Get Location'}</Button>
          </div>
          {addressError && <div className="text-xs text-red-700 bg-red-200 p-2 mt-2 rounded-xl">{addressError}</div>}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">    Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ''} />
        <div className="mt-6 text-right">
          <Button type='primary' disabled={isSubmitting}>{isSubmitting?'Placing new order':`Order now for ${formatCurrency(totalCartPrice+priorityPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }){
    const formData=await request.formData();
    const data = Object.fromEntries(formData);
    const order={
        ...data,
        cart:JSON.parse(data.cart),
        priority:data.priority
    }
    const errors={};
    if(!isValidPhone(data.phone)) errors.phone='Please enter a valid phone number'
    if(Object.keys(errors).length>0) return errors;
    const newOrder = await createOrder(order);
    store.dispatch(clearCart())
    return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
