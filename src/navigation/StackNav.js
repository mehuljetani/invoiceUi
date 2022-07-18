import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Dashboard from '../screens/dashboard/Dashboard';
import Customer from '../screens/dashboard/customers/Customer';
import Invoice from '../screens/dashboard/invoices/Invoice';
import Payment from '../screens/dashboard/payments/Payment';
import Product from '../screens/dashboard/product/Product';
import AddCustomer from '../screens/dashboard/customers/AddCustomer';
import CustomerDetail from '../screens/dashboard/customers/CustomerDetail';
import UpdateCustomer from '../screens/dashboard/customers/UpdateCustomer';
import AddProduct from '../screens/dashboard/product/AddProduct';
import ProductDetail from '../screens/dashboard/product/ProductDetail';
import UpdateProduct from '../screens/dashboard/product/UpdateProduct';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, statusBarColor: 'darkgray'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{gestureEnabled: true}}
      />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
      <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
    </Stack.Navigator>
  );
};

export default StackNav;
