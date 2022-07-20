import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import orders from "../../../assets/data/orders.json";
import OrderListItem from "../../components/OrderListItem";

const OrdersScreen = () => {
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
