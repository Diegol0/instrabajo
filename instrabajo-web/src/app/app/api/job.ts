interface Rating {
    stars: number;
    comment?: string;
}
export interface Job {
    id?: string;
    name?: string;
    description?: string;
    skill?: string;
    rateType?: string;
    hourlyRate?: number;
    fixedRate?: number;
    status?: string;
    images?: string[];
    address?: string;
    employee?: string;
    employer?: string;
    employeeRating?: Rating;
    employerRating?: Rating;
}