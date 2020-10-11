export interface MenuItem {
  id: string;
  name: string;
  price: number;
  type: 'MAIN_COURSE' | 'SIDE';
  image: string;
  __typename: 'MenuItem';
}

export interface MenuItemListData {
  menuItems: MenuItem[];
}

export interface MenuItemData {
  menuItem: MenuItem;
}
