import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Search from '../Components/Search';
import { colors } from '../Global/Colors';
import ProductItem from '../Components/ProductItem';
import { useSelector } from 'react-redux';

const ItemListCategory = ({
    navigation
}) => {
    const productsSelected = useSelector(state => state.shopReducer.value.productsSelected)
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        //Lógica de manejo de category
        const productsFiltered = productsSelected.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
        setProducts(productsFiltered);
    }, [productsSelected, keyword]);
    const onSearch = (input) => {
        setKeyword(input.trim());
    }
    return (
        <View style={styles.container}>
            <Search
                onSearch={onSearch}
            />
            <FlatList
                style={styles.itemContainer}
                data={products}
                keyExtractor={product => product.id}
                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightOcean,
        alignItems: 'center',
    },
    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})