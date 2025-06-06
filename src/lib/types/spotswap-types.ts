export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Collection {
  title: string;
  county: string;
  userId?: string;
  spots?: Spot[];
  _id?: string;
}

export interface Spot {
  name: string;
  description: string;
  collectionId?: string;
  category: string;
  img?: string;
  latitude: number;
  longitude: number;
  _id?: string;
}

export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}
