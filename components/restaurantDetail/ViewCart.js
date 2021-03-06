import React, { useState } from "react";
import { View, Modal} from "react-native";
import { useSelector } from "react-redux";
import CheckOutBtn from "./CheckOutBtn";
import PlaceOrderLoading from "./PlaceOrderLoading";
import CheckOutModalContent from "./CheckOutModalContent";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedItems } = useSelector((state) => state.cart);
  const { name } = useSelector(state => state.cart.selectedRestaurant);

  const restaurantSelectedItems = selectedItems.filter(item => item.restaurantName === name);
  const total = restaurantSelectedItems.map((item) => Number(item.price.replace("$", ""))).reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const handleReadyToPay = () => {
    setModalVisible(false);
    setTimeout(() =>  navigation.navigate('Make-Payment'), 1000)
  }

  return (
    <React.Fragment>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <CheckOutModalContent 
          total={total} 
          totalUSD={totalUSD}
          navigation={navigation}
          items={selectedItems} 
          restaurantName={name} 
          setOrderPlacedLoading={handleReadyToPay}
        />
      </Modal>

      <View
        style={{
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          bottom: 20,
          zIndex: 999,
          padding: 0,
          marginBottom: 90,
        }}
      >
        {total ? (
          <CheckOutBtn totalPrice={totalUSD} handleShowModal={() => setModalVisible(true)} />
        ) : (<></>)}
      </View>

      {loading ? <PlaceOrderLoading /> : <></>}
    </React.Fragment>
  );
}