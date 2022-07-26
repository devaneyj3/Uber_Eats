import { createContext, useEffect, useState, useContext } from "react";

import { DataStore } from "aws-amplify";

import { Order, OrderDish, Basket } from "../models";
import { useAuthContext } from "../contexts/AuthContext";
import { useBasketContext } from "./BasketContext";

const OrdersContext = createContext({});

const OrdersContextProvider = ({ children }) => {
	const { dbUser } = useAuthContext();
	const [orders, setOrders] = useState([]);
	const { restaurant, totalBasketPrice, basket, basketDishes } =
		useBasketContext();

	useEffect(() => {
		DataStore.query(Order, (o) => o.userID("eq", dbUser?.id)).then((orders) => {
			setOrders(orders);
		});
	}, [dbUser]);
	const createOrder = async () => {
		// create an order
		const newOrder = await DataStore.save(
			new Order({
				userID: dbUser.id,
				total: totalBasketPrice,
				Restaurant: restaurant,
				status: "NEW",
			})
		);
		//add basket dishes to order

		const orderDishes = await Promise.all(
			basketDishes.map((dish) =>
				DataStore.save(
					new OrderDish({
						orderID: newOrder.id,
						quantity: dish.quantity,
						Dish: dish.Dish,
					})
				)
			)
		);
		//delete the basket
		await DataStore.delete(basket);

		setOrders([...orders, newOrder]);
		return newOrder;
	};

	const getOrder = async (orderID) => {
		const order = await DataStore.query(Order, orderID);
		//get the dishes for the order
		const orderDishes = await DataStore.query(OrderDish, (od) =>
			od.orderID("eq", orderID)
		);
		return { ...order, dishes: orderDishes };
	};

	return (
		<OrdersContext.Provider
			value={{
				createOrder,
				orders,
				getOrder,
			}}>
			{children}
		</OrdersContext.Provider>
	);
};

export default OrdersContextProvider;

export const useOrdersContext = () => useContext(OrdersContext);
