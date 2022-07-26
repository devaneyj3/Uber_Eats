import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import OrderListItem from "../../components/OrderListItem";

import { useOrdersContext } from "../../contexts/OrdersContext";

const OrdersScreen = () => {
	const { orders } = useOrdersContext();
	return (
		<View style={styles.screen}>
			<FlatList
				data={orders}
				renderItem={({ item }) => <OrderListItem order={item} />}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default OrdersScreen;
