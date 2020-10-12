export enum ItemType {
  MAIN_COURSE = 'MAIN_COURSE',
  SIDE = 'SIDE',
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  type: ItemType;
  image: string;
  __typename: 'MenuItem';
}

export interface MenuItemListData {
  menuItems: MenuItem[];
}

export interface MenuItemData {
  menuItem: MenuItem;
}
