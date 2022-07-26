import { createContext, useEffect, useState, useContext } from "react";

import { DataStore } from "aws-amplify";

import { Basket, DishBasket } from "../models";
import { useAuthContext } from "../contexts/AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
	const [basket, setBasket] = useState(null);
	const [restaurant, setRestaurant] = useState(null);
	const [basketDishes, setBasketDishes] = useState([]);

	const { dbUser } = useAuthContext();

	const totalBasketPrice = basketDishes.reduce(
		(acc, dish) => acc + dish.quantity * dish.Dish.price,
		restaurant?.deliveryFee
	);

	useEffect(() => {
		DataStore.query(Basket, (b) =>
			b.restaurantID("eq", restaurant?.id).userID("eq", dbUser?.id)
		).then((baskets) => {
			setBasket(baskets[0]);
		});
	}, [dbUser, restaurant]);

	useEffect(() => {
		if (basket) {
			DataStore.query(DishBasket, (bd) => bd.basketID("eq", basket.id)).then(
				setBasketDishes
			);
		}
	}, [basket]);

	const addDishToBasket = async (dish, quantity) => {
		// create a new one
		let theBasket = basket || (await createNewBasket());
		//create a new dish basket
		const newDish = await DataStore.save(
			new DishBasket({
				Dish: dish,
				quantity,
				basketID: theBasket.id,
			})
		);
		setBasketDishes([...basketDishes, newDish]);
	};
	const createNewBasket = async () => {
		const newBasket = await DataStore.save(
			new Basket({
				userID: dbUser.id,
				restaurantID: restaurant.id,
			})
		);
		setBasket(newBasket);
		return newBasket;
	};

	return (
		<BasketContext.Provider
			value={{
				addDishToBasket,
				setRestaurant,
				restaurant,
				basket,
				basketDishes,
				totalBasketPrice,
			}}>
			{children}
		</BasketContext.Provider>
	);
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
