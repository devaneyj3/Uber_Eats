import React, { useRef, useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import { FontAwesome5, Fontisto } from "@expo/vector-icons";

import orders from "../../../assets/data/orders.json";

import { styles } from "./styles";

const order = orders[0];

const OrdersDelivey = () => {
	const bottomSheetRef = useRef(null);

	const snapPoints = useMemo(() => ["12%", "90%"], []);

	return (
		<View style={styles.container}>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				handleIndicatorStyle={styles.handleIndicator}>
				<View style={styles.handleIndicatorContainer}>
					<Text style={styles.routeDetailsText}>14 min</Text>
					<FontAwesome5
						name="shopping-bag"
						size={30}
						color="#3FC060"
						style={{ marginHorizontal: 10 }}
					/>
					<Text style={styles.routeDetailsText}>5 km</Text>
				</View>
				<View style={styles.deliveryDetailsContainer}>
					<Text style={styles.restaurantInfo}>{order.Restaurant.name}</Text>
					<View style={styles.icon}>
						<Fontisto name="shopping-store" size={22} color="grey" />
						<Text style={styles.address}>{order.Restaurant.address}</Text>
					</View>
					<View style={styles.icon}>
						<FontAwesome5 name="map-marker-alt" size={30} color="grey" />
						<Text style={styles.address}>{order.User.address}</Text>
					</View>
					<View style={styles.foodItemContainer}>
						<Text style={styles.foodItem}>Onion Rings x1</Text>
						<Text style={styles.foodItem}>Big Mac x3</Text>
						<Text style={styles.foodItem}>Big Tasty x2</Text>
						<Text style={styles.foodItem}>Coca-Cola x1</Text>
					</View>
				</View>
				<View style={styles.btn_container}>
					<Text style={styles.btn}>Accept Order</Text>
				</View>
			</BottomSheet>
		</View>
	);
};

export default OrdersDelivey;
