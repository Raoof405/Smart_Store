export interface UpdateClient {
  id: number;
  name: string;
  phoneNumber: string;
  isSeller: boolean;
  address?: string;
  email?: string;
}
