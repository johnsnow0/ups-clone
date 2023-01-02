import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';
import { Card, Icon } from '@rneui/themed';

type Props = {
    userId: string;
    name: string;
    email: string;
}

const CustomerCard = ({ email, name, userId }: Props) => {

    const { loading, error, orders } = useCustomerOrders(userId)
    const navigation = useNavigation<CustomerScreenNavigationProp>();
 

    return (
        <TouchableOpacity onPress={()=> navigation.navigate('MyModal', {name: name, userId: userId})} className=''>
            <Card containerStyle={{ padding: 5, borderRadius: 10 }} >
                <View>
                    <View className='flex-row justify-between'>
                        <View>
                            <Text className='text-2xl font-bold'>{name}</Text>
                            <Text className='text-sm' style={{ color: '#59C1CC' }}>ID: {userId}
                            </Text>
                        </View>

                        <View className='flex-row items-center justify-end'>
                            <Text style={{ color: '#59C1CC' }}>{loading ? "loading..." : `${orders.length} x`}</Text>
                            <Icon
                                containerStyle={{ marginBottom: 5, marginLeft: 'auto' }}
                                name='box'
                                type='entypo'
                                color='#59C1CC'
                                size={50} />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard