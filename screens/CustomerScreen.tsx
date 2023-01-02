import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { TabStackParamList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '@rneui/themed'
import useCustomerOrders from '../hooks/useCustomerOrders'
import { useQuery } from '@apollo/client'
import { GET_CUSTOMERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'

export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Customer'>,
    NativeStackNavigationProp<RootStackParamList>
>


const CustomerScreen = () => {
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('');
    const {loading, error, data} = useQuery(GET_CUSTOMERS)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <ScrollView style={{ backgroundColor: '#59C1CC' }}>
            <Image source={{ uri: 'https://links.papareact.com/3jc' }}
                className='w-full h-64' />
            <Input
            containerStyle={{backgroundColor:'white', paddingTop:5, paddingBottom:0, paddingHorizontal:10}}
                placeholder='Search by customer...'
                value={input}
                onChangeText={setInput}
                className='bg-white pt-5 pb-0 px-10' />

                {data?.getCustomers?.filter((customer: CustomerList)=> customer.value.name.includes(input)
                ).map(({name: ID, value: {email, name}}: CustomerResponse)=> (
                    <CustomerCard key={ID} email={email} name={name} userId={ID} />
                ))}
        </ScrollView>
    )
}

export default CustomerScreen