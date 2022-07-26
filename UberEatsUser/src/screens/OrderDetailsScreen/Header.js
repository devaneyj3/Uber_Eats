import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const OrderDetailsHeader = ({ order }) => {
	return (
		<View>
			<View style={styles.screen}>
				<Image source={{ uri: order.Restaurant.image }} style={styles.image} />
				<View style={styles.container}>
					<Text style={styles.title}>{order.Restaurant.name}</Text>
					<Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>
					<Text style={styles.menuTitle}>Your order</Text>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	image: {
		width: "100%",
		aspectRatio: 5 / 3,
	},
	title: {
		fontSize: 35,
		fontWeight: "600",
		marginVertical: 10,
	},
	subtitle: {
		fontSize: 15,
		color: "grey",
	},
	container: {
		margin: 10,
	},
	menuTitle: {
		marginTop: 20,
		fontSize: 18,
		letterSpacing: 0.7,
	},
});

export default OrderDetailsHeader;
