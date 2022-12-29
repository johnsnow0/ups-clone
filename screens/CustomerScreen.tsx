import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { TabStackParamList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '@rneui/themed'
export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Customer'>,
    NativeStackNavigationProp<RootStackParamList>
>


const CustomerScreen = () => {
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('')

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
                placeholder='Search by customer...'
                value={input}
                onChangeText={setInput}
                className='bg-white pt-5 pb-0 px-10' />
        </ScrollView>
    )
}

export default CustomerScreen