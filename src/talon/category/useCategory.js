import { useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';
import { useCatalogContext } from '../../lib/context/catalog';

export const useCategory = (props) => {
  const { categoryId, query, updateCategories } = props;
  console.log('request');
  const { loading, error, data } = useQuery(query);
  if (data != undefined && data.category) {
    updateCategories(data.category);
  }
  return {
    error,
    loading,
  };
};
