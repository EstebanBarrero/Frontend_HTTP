export interface ListaUsuariosI{
  first_name: string;
  last_name: string;
  type_document: string;
  document: number;
  birthday: Date;
  phone_number:number;
  is_active: boolean;
  register_date: Date;
  address: string;
  role:number
}