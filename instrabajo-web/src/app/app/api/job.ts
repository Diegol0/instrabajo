interface Rating {
    stars: number;
    comment?: string;
}
export interface Job {
    _id?: string;
    name?: string;
    description?: string;
    skill?: string;
    rateType?: string;
    hourlyRate?: number;
    fixedRate?: number;
    status?: string;
    images?: any[];
    address?: string;
    employee?: string;
    employer?: string;
    employeeRating?: Rating;
    employerRating?: Rating;
}