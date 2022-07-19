import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const OrderListItem = ({ order }) => {
	const navigation = useNavigation();
	const onPress = () => {
		navigation.navigate("Order", { id: order.id });
	};
	return (
		<Pressable style={styles.screen} onPress={onPress}>
			<Image
				source={{ uri: order.Restaurant.image }}
				style={{ height: 75, width: 75, marginRight: 5 }}
			/>
			<View>
				<Text style={styles.name}>{order.Restaurant.name}</Text>
				<Text style={styles.items}>3 items &#8226; $38.45</Text>
				<Text>2 days ago &#8226; {order.status}</Text>
			</View>
		</Pressable>
	);
};
const styles = StyleSheet.create({
	screen: {
		flexDirection: "row",
		margin: 10,
		alignItems: "center",
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
	},
	items: {
		marginVertical: 5,
	},
});

export default OrderListItem;
