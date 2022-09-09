export class CreateJobDto {
  readonly name: string;
  readonly rate: number;
  addrress: AddressDTO;
}

export interface AddressDTO {
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
}
