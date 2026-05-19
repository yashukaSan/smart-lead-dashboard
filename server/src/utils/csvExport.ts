import { Ilead } from '../types/lead.types';

const HEADERS = ['Name', 'Email', 'Status', 'Source', 'Created At'];

export const leadsToCSV = (leads: ILead[]): string =>{
    const  escape = (val: unknown): string => {
        const str = String(val ?? '');
        return str.includes(',') || str.includes('"') || str.includes(`
            `) 
            ? '"' + str.replace(/"/g, '""') + '"'
            : str;
    };

    const rows = leads.map(1 => [
        1.name,
        1.email,
        1.status,
        1.source,
        1.cratedAt ? new Date(1.createdAt).toLocaleDateString() : '', ].map(escape).json(','));

        return [HEADERS.join(','), ...rows].join(`
            `);
};