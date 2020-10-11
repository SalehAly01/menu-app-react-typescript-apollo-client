import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface MenuItemListData {
  menuItems: {
    _id: string;
    name: string;
    price: number;
    type: 'MAIN_COURSE' | 'SIDE';
    image: string;
    __typename: 'MenuItem';
  }[];
}

const GET_MENU_QUERY = gql`
  query menuItemList {
    menuItems {
      _id
      name
      price
      type
      image
    }
  }
`;

const Menu = () => {
  const { data, loading, error } = useQuery<MenuItemListData>(GET_MENU_QUERY);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;

  return <div>Menu Page</div>;
};

export default Menu;
