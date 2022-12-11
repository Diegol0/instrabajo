import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    constructor() {}

    skills = [
        { label: 'Electrónico', value: 'ELECTRONIC' },
        { label: 'Gamer', value: 'GAMER' },
        { label: 'Pintor', value: 'PAINTER' },
        { label: 'Entrenador', value: 'TRAINER' },
        { label: 'Mecánico', value: 'MECHANIC' },
        { label: 'Carpintero', value: 'CARPENTER' },
        { label: 'Limpiador', value: 'CLEARNER' },
        { label: 'Jardinero', value: 'GARDENER' },
        { label: 'Niñero', value: 'BABYSITTER' },
        { label: 'Mesero', value: 'WAITER' },
        { label: 'Plomero', value: 'PLUMBER' },
        { label: 'Herrero', value: 'BLACKSMITH' },
    ];

    rateTypes = [
        { label: 'Por hora', value: 'HOURLY' },
        { label: 'Fijo', value: 'FIXED' },
    ];

    jobStatus = [
        { label: 'Disponible', value: 'AVAILABLE' },
        { label: 'Completado', value: 'COMPLETED' },
        { label: 'Pendiente', value: 'PENDING' },
        { label: 'Aceptado', value: 'ACCEPTED' },
    ];

    getJobStatus(status: string) {
        const result = this.jobStatus.filter((s) => s.value === status);
        return result.length > 0 ? result[0].label : '';
    }

    getJobSkill(skill: string) {
        const result = this.skills.filter((s) => s.value === skill);
        return result.length > 0 ? result[0].label : '';
    }

    getJobRateType(type: string) {
        const result = this.rateTypes.filter((s) => s.value === type);
        return result.length > 0 ? result[0].label : '';
    }
}
