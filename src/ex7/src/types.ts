export type ThreadMsg = {
  type: string;
  data: any;
};

export const createThreadMsg = (type: string, data: any) => ({ type, data });
