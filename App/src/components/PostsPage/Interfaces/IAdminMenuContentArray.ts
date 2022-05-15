import { IAdminMenuContentItem } from "./IAdminMenuContentItem";

export interface IAdminMenuContentArray<T> {
  sectionName: string;
  items: IAdminMenuContentItem<T>[];
}
