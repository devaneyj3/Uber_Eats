import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";

const OrderItem = ({ order }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				borderColor: "#3FC060",
				margin: 10,
				borderWidth: 2,
				borderRadius: 12,
			}}>
			<Image
				source={{ uri: order.Restaurant.image }}
				style={{
					width: "25%",
					height: "100%",
					borderBottomLeftRadius: 10,
					borderTopLeftRadius: 10,
					paddingVertical: 5,
				}}
			/>
			<View style={{ flex: 1, marginLeft: 20 }}>
				<Text style={{ fontSize: 18, fontWeight: "500" }}>
					{order.Restaurant.name}
				</Text>
				<Text style={{ color: "grey" }}>{order.Restaurant.address}</Text>
				<Text style={{ marginTop: 10 }}>Delivery Details:</Text>

				<Text style={{ color: "grey" }}>{order.User.name}</Text>
				<Text style={{ color: "grey" }}>{order.User.address}</Text>
			</View>
			<View
				style={{
					backgroundColor: "#3FC060",
					borderBottomRightRadius: 10,
					borderTopRightRadius: 10,
					alignItems: "center",
					justifyContent: "center",
					padding: 5,
				}}>
				<Entypo
					name="check"
					size={30}
					color="white"
					style={{ marginLeft: "auto" }}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default OrderItem;
