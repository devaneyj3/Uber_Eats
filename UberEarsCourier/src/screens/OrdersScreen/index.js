import React, { useRef } from "react";
import { View, Text, FlatList } from "react-native";

import orders from "../../../assets/data/orders.json";

import OrderItem from "../../../src/components/OrderItem";

import BottomSheet from "@gorhom/bottom-sheet";

const OrdersScreen = () => {
	const bottomSheetRef = useRef(null);
	return (
		<View style={{ backgroundColor: "lightblue", flex: 1 }}>
			<BottomSheet ref={bottomSheetRef} snapPoints={["12%", "95%"]}>
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
