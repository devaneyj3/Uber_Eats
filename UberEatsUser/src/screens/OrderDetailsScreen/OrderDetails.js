import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";

import OrderDetailsHeader from "./Header";

import BasketDishItem from "../../components/BasketDishItem";

import { useOrdersContext } from "../../contexts/OrdersContext";

import { useRoute } from "@react-navigation/native";
const OrderDetails = () => {
	const [order, setOrder] = useState();
	const { getOrder } = useOrdersContext();

	const route = useRoute();
	const { id } = route?.params;

	useEffect(() => {
		getOrder(id).then(setOrder);
	}, [id]);

	console.log("order", order);

	if (!order) {
		return <ActivityIndicator size={"large"} color="grey" />;
	}

	return (
		<FlatList
			ListHeaderComponent={<OrderDetailsHeader order={order} />}
			data={order.dishes}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <BasketDishItem dish={item} />}
		/>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default OrderDetails;
