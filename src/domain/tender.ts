export default interface Tender {
    id: string;
    name: string;
    status: string;
    company: string;
    price?: Price;
    publishDate?: number;
    startDate?: number;
    dueDate?: number;
    domain: string;
    link: string;
}

interface Price {
    value: number;
    currency: string;
}