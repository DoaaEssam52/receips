import { User } from './user-model';

export interface GetUsersList {
  pageNumber: number;
  pageSize: number;
  data: User[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
