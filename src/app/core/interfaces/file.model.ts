import {CatalogueModel,UserModel} from "@core/interfaces";

export interface FileModel {
  id?: string;
  name?: string;
  modelId?: string;
  description?: string;
  extension?: string;
  path?: string;
  size?: number;
  enabled?: boolean;
  type?: CatalogueModel;
  file?:any;
  user?:UserModel;
}
