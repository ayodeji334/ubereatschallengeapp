import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../redux/actionsType";
import FoodImage from "./FoodImage";
import FoodInfo from "./FoodInfo";

export default function MenuItems({restaurantName, foods, hideCheckbox, marginLeft}) {
  const { selectedItems } = useSelector((state) => state.cart);
  const restaurantSelectedItems = selectedItems.filter(item => item.restaurantName === restaurantName);
  const dispatch = useDispatch();

  const addAndRemoveItemInCart = (item, checkboxValue) => {
    if(checkboxValue){
      dispatch({
        type: ADD_TO_CART,
        payload: {
          ...item,
          restaurantName,
          checkboxValue: checkboxValue,
          quantity: 1
        }
      })
    }else{
      dispatch({
        type: REMOVE_FROM_CART,
        payload: {
          ...item,
          restaurantName,
          checkboxValue: checkboxValue,
          quantity: 1
        }
      })
    }
    
  }
  
  const isFoodAlreadyInCart = (food, cartItems) => Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom: 80}}>
      {foods.map((food) => (
        <View key={food.id} style={{ borderBottomColor: '#a3a2a2', borderBottomWidth: 1 }}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? <></> : (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                fillColor="green"
                isChecked={isFoodAlreadyInCart(food, restaurantSelectedItems)}
                onPress={(checkboxValue) => addAndRemoveItemInCart(food, checkboxValue)}
              />
            )}
            <FoodInfo food={food} isItemSelected={hideCheckbox} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "900",
    fontFamily: 'PoppinsBold'
  },
});