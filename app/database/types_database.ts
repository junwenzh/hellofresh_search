export type Results = {
  command: string;
  rowCount: number;
  rows: any[];
  fields: Field[];
  rowAsArray: boolean;
};

export type Field = {
  name: string;
  tableID: number;
  columnID: number;
  dataTypeID: number;
  dataTypeSize: number;
  dataTypeModifier: number;
  format: string;
};
