import { ILead } from '../types/lead.types';

const HEADERS = ['Name', 'Email', 'Status', 'Source', 'Created At'];

export const leadsToCSV = (leads: ILead[]): string => {
    const escape = (val: unknown): string => {
        const str = String(val ?? '');
        return str.includes(',') || str.includes('"') || str.includes('\n')
            ? '"' + str.replace(/"/g, '""') + '"'
            : str;
    };

    const rows = leads.map(lead => [
        lead.name,
        lead.email,
        lead.status,
        lead.source,
        lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '',
    ].map(escape).join(','));

    return [HEADERS.join(','), ...rows].join('\n');
};