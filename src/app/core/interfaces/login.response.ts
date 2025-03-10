import {RoleModel, UserModel} from '@core/interfaces';

export interface LoginResponse {
  data: Data;
  message: string;
  title: string;
  accessToken: string;
}

interface Data {
  auth: UserModel;
  accessToken: string;
  roles: RoleModel[];
}
