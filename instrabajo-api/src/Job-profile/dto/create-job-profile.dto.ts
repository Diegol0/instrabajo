export class CreateJobProfileDto {
  _id: string;
  name: string;
  description: string;
  skill: string;
  rateType: string;
  hourlyRate: number;
  fixedRate: number;
  status: string;
  images: string;
  address: string;
  employee: string;
  employer: string;
  employeeVerified: boolean;
}
