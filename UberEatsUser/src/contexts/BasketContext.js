import { createContext, useEffect, useState, useContext } from "react";

import { DataStore } from "aws-amplify";

import { Basket, DishBasket } from "../models";
import { useAuthContext } from "../contexts/AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
	const [basket, setBasket] = useState(null);
	const [restaurant, setRestaurant] = useState(null);

	const { dbUser } = useAuthContext();

	useEffect(() => {
		DataStore.query(Basket, (b) =>
			b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
		).then((baskets) => setBasket(baskets[0]));
	}, [dbUser, restaurant]);

	const addDishToBasket = async (dish, quantity) => {
		// create a new one
		let theBasket = basket || (await createNewBasket());
		//create a new dish basket
		DataStore.save(
			new DishBasket({
				Dish: dish,
				quantity,
				basketID: theBasket.id,
			})
		);
	};
	const createNewBasket = async () => {
		console.log("creating new basket");
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
			value={{ addDishToBasket, setRestaurant, restaurant, basket }}>
			{children}
		</BasketContext.Provider>
	);
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
