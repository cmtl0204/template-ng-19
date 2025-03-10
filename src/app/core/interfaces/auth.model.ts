import {RoleModel} from '@core/interfaces';

export interface AuthModel {
  id: string;
  roles: RoleModel[];
  avatar: string;
  email: string;
  emailVerifiedAt: Date;
  lastname: string;
  name: string;
  username: string;
}
