import React, { useMemo, useRef } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";

import orders from "../../../assets/data/orders.json";

import OrderItem from "../../../src/components/OrderItem";

import styles from "./styles";

import BottomSheet from "@gorhom/bottom-sheet";

import { Entypo } from "@expo/vector-icons";

import MapView, { Marker } from "react-native-maps";

const OrdersScreen = () => {
	const bottomSheetRef = useRef(null);
	const { height, width } = useWindowDimensions();

	const snapPoints = useMemo(() => ["10%", "95%"], []);
	return (
		<View style={styles.container}>
			<MapView style={{ height, width }} showsUserLocation followUserLocation>
				{orders.map((order, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: order.Restaurant.lat,
							longitude: order.Restaurant.lng,
						}}
						title={order.Restaurant.name}
						description={order.Restaurant.address}>
						<View style={styles.icon_view}>
							<Entypo name="shop" size={24} color="white" />
						</View>
					</Marker>
				))}
			</MapView>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				handleIndicatorStyle={{
					backgroundColor: "grey",
					width: 100,
				}}>
				<View style={{ alignItems: "center", marginBottom: 30 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
							letterSpacing: 0.5,
							paddingBottom: 5,
						}}>
						Your Online
					</Text>
					<Text style={{ letterSpacing: 0.5, color: "grey" }}>
						Available Orders: {orders.length}
					</Text>
				</View>
				<FlatList
					data={orders}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <OrderItem order={item} />}
				/>
			</BottomSheet>
		</View>
	);
};

export default OrdersScreen;
