import { gql } from '@apollo/client';

const MENU_ITEM_DETAILS = gql`
  fragment ItemDetails on MenuItem {
    id: _id
    name
    price
    type
    image
  }
`;

export const GET_MENU_QUERY = gql`
  query menuItemList {
    menuItems {
      ...ItemDetails
    }
  }
  ${MENU_ITEM_DETAILS}
`;

export const CREATE_MENU_ITEM = gql`
  mutation CreateMenuItem($input: NewMenuItemInput!) {
    newMenuItem(input: $input) {
      ...ItemDetails
    }
  }
  ${MENU_ITEM_DETAILS}
`;

export const REMOVE_MENU_ITEM = gql`
  mutation RemoveMenuItem($id: ID!) {
    removeMenuItem(id: $id) {
      ...ItemDetails
    }
  }
  ${MENU_ITEM_DETAILS}
`;
