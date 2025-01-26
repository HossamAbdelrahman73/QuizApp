export interface ITableColumnConfig {
  key: string;
  label: string;
  isAction?: boolean;
  pipe?: ITablePipe;
  actions?: ITableAction[];
}
interface ITableAction {
  label: string;
  color: string;
  icon: string;
  action: (row: any) => void;
}
export interface ITablePipe {
  type: string;
  format: string | number;
}
