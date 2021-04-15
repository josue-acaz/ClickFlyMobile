import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components
import Screen from '../../../components/Screen';
import ArrowBack from '../../../components/ArrowBack';
import SubsectionTitle from '../../../components/SubsectionTitle';
import FloatingButton from '../../../components/FloatingButton';
import ListItem from '../../../components/ListItem';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import api from '../../../services/api';

const PlusIcon = () => <Entypo name="plus" size={24} color="#ffffff" />;

function AddressItem({address, handleEdit}) {
    const [checked, setChecked] = useState(false);

    return(
        <ListItem 
            id={address.id} 
            checked={checked} 
            handleChecked={() => {}}
            handleEdit={handleEdit}
        >
            <Text style={styles.address_title}>{address.name}</Text>
            <Text style={styles.address_description}>{address.street}, {address.neighborhood}, {address.number}, {address.city}-{address.uf}</Text>
        </ListItem>
    );
}

export default function Addresses({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const {customer, returnRoute} = route.params;

    async function index() {
        try {
            const response = await api.get("/customer-addresses", {
                params: {
                    text: "",
                    limit: 10,
                    offset: 0,
                    order: "DESC",
                    order_by: "created_at"
                }
            });

            const {count, rows} = response.data;
            setAddresses(rows);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    function handleEdit(id) {
        navigation.navigate("EditAddress", {id, returnRoute: "Addresses"});
    }

    useEffect(() => {index()}, [route.params]);

    return(
        <Screen>
            <ArrowBack
                onPress={() => {
                    navigation.goBack();
                }}
            />

            <SubsectionTitle text="Meus endereços" />
            <Text style={styles.aditionalTxt}>
                Gerencie seus endereços de pagamentos
            </Text>

            <View style={styles.addresses}>
                {addresses.map((address, index) => <AddressItem key={index} address={address} handleEdit={handleEdit} />)}
            </View>

            <FloatingButton
              color="#09354B"
              icon={<PlusIcon />}
              onPress={() => handleEdit("0")}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    addresses: {
        marginTop: 15,
    },
    aditionalTxt: {
        fontSize: 14,
        color: '#666',
    },
    address_title: {
        fontSize: 16,
        color: '#444444',
        fontWeight: 'bold'
    },
    address_description: {
        fontSize: 14,
        color: '#666666'
    }
});