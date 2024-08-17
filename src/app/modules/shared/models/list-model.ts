export interface ListHeader {
  type: string;
  header: string;
  datafiled: string;
  format?: string;
  defaultImage?: string;
  actions?: {
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    isFavorite?: boolean;
  };
}
