export interface MenuModel {
  id: string;
  children: MenuModel[],
  code: string;
  icon: string;
  enabled: boolean;
  label: string;
  routerLink: string;
  type: string;
}

export interface CreateMenuDto extends Omit<MenuModel, 'id'> {
}

export interface UpdateMenuDto extends Partial<Omit<MenuModel, 'id'>> {
}

export interface ReadMenuDto extends Partial<MenuModel> {
}
