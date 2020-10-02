export const ifExists = (prop: any, value?: any) =>
  (prop || undefined) && (value ?? true);

export const ifNotExists = (prop: any, value?: any) =>
  (!prop || undefined) && (value ?? true);
