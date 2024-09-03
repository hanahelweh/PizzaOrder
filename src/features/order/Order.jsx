// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
  } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from '../order/OrderItem'
import { useEffect } from "react";
import UpdateOrder from './UpdatOrder';
function Order() {
  const order=useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  console.log(priority)
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  return (
    <div className="max-w-5xl p-5 mx-auto">
      <div className="">
        <h2 className="font-bold mb-1">Order #{id}</h2>
        <div>
          {priority && <span className="bg-red-700 text-white py-1 px-2 rounded-3xl mr-2">Priority</span>}
          <span className="bg-red-300 py-1 px-2 rounded-3xl">{status} order</span>
        </div>
      </div>

      <div>
        <p className="text-slate-500 font-semibold mt-2">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-slate-400">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="mt-10 divide-y-2">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="text-right">
        <p>Price pizza: <span className="text-red-700 font-semibold">{formatCurrency(orderPrice)}</span></p>
        {priority && <p>Price priority: <span className="text-red-700 font-semibold">{formatCurrency(priorityPrice)}</span></p>}
        <p>Total: <span className="text-red-700 font-bold text-lg">{formatCurrency(orderPrice + priorityPrice)}</span></p>
      </div>
      {!priority && <div className="mt-2"><UpdateOrder order={order}/></div>}
    </div>
  );
}
export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
  