export interface IAdminMenuContentItem<T> {
  itemName: string;
  switchTo: T;
  isActive: boolean;
}
