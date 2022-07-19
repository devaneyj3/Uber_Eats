import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import restaurants from "../../../assets/data/restaurants.json";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const dish = restaurants[0].dishes[0];

const DishDetailsScreen = () => {
	const navigation = useNavigation();
	const [quantity, setQuantity] = React.useState(1);

	const onMinus = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const onPlus = () => {
		setQuantity(quantity + 1);
	};
	//  calculate total price
	const totalPrice = quantity * dish.price;

	const onPress = () => {
		navigation.navigate("Basket");
	};
	return (
		<View style={styles.page}>
			<Text style={styles.title}>{dish.name}</Text>
			<Text style={styles.description}>{dish.description}</Text>
			<View style={styles.seperator} />
			<View style={styles.row}>
				<AntDesign
					name="minuscircleo"
					size={60}
					color={"black"}
					onPress={onMinus}
				/>
				<Text style={styles.quantity}>{quantity}</Text>
				<AntDesign
					name="pluscircleo"
					size={60}
					color={"black"}
					onPress={onPlus}
				/>
			</View>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonText}>
					Add {quantity} to basket &#8226; ${totalPrice.toFixed(2)}
				</Text>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	page: {
		flex: 1,
		width: "100%",
		paddingVertical: 30,
	},
	title: {
		fontSize: 30,
		fontWeight: "600",
		marginVertical: 10,
	},
	seperator: {
		height: 1,
		backgroundColor: "lightgrey",
		marginVertical: 10,
	},
	description: {
		color: "grey",
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50,
	},
	quantity: {
		fontSize: 25,
		marginHorizontal: 20,
	},
	button: {
		backgroundColor: "black",
		padding: 20,
		marginTop: "auto",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
	},
});

export default DishDetailsScreen;
