/**
 * News Types for Gebze Admin Panel
 */
export interface NewsItem {
    id: string;
    title: string;
    category: Category;
    date: string;
    description: string;
    imageUrl: string;
}
export type Category = 'yonetim' | 'baskanlik' | 'halk' | 'genel';
export interface NewsFilter {
    category?: Category;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}
export interface NewsCreateData {
    title: string;
    category: Category;
    date: string;
    description: string;
    imageUrl: string;
}
export interface NewsUpdateData extends Partial<NewsCreateData> {
    id: string;
}
//# sourceMappingURL=news.types.d.ts.map