import React, { useState } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useCatalogContext } from '../../lib/context/catalog';
import { useCategory } from '../../talon/category/useCategory';
import { useQuery, gql } from '@apollo/client';
import categoryQuery from './categoryQuery';

function CategoryPage(props) {
  const CATEGORY_QUERY = categoryQuery();
  const categoryId = '2';
  const [catalogState, catalogApi] = useCatalogContext();
  const { updateCategories } = catalogApi;
  const talonProps = useCategory({
    categoryId,
    query: CATEGORY_QUERY,
    updateCategories: updateCategories,
  });
  const { error, loading } = talonProps;
  console.log(error);
  console.log(loading);
  let array = [];
  if (catalogState && catalogState.categories) {
    for (const key in catalogState.categories) {
      if (catalogState.categories.hasOwnProperty(key)) {
        const element = catalogState.categories[key];
        if (element.id) {
          array.push(element);
        }
      }
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (array.length === 0) {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <Text>Category Page</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        paddingLeft: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
      }}
    >
      <Text>{item.name}</Text>
    </View>
  );
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Text style={{ fontSize: 16, margin: 10 }}>All Category</Text>
      <FlatList data={array} renderItem={renderItem} />
    </View>
  );
}

export default CategoryPage;
