/**
 * News Service for Gebze Admin Panel
 * Handles news CRUD operations and data management
 */
import { NewsItem, Category } from '../types/news.types';
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
export declare class NewsService {
    private static instance;
    private newsData;
    private constructor();
    static getInstance(): NewsService;
    /**
     * Load initial news data
     */
    private loadInitialData;
    /**
     * Get all news items
     */
    getAllNews(): NewsItem[];
    /**
     * Get news by ID
     */
    getNewsById(id: string): NewsItem | undefined;
    /**
     * Filter news by criteria
     */
    filterNews(filter: NewsFilter): NewsItem[];
    /**
     * Create new news item
     */
    createNews(data: NewsCreateData): NewsItem;
    /**
     * Update existing news item
     */
    updateNews(data: NewsUpdateData): NewsItem | null;
    /**
     * Delete news item
     */
    deleteNews(id: string): boolean;
    /**
     * Delete multiple news items
     */
    deleteMultipleNews(ids: string[]): number;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Save data to localStorage
     */
    private saveToStorage;
    /**
     * Load data from localStorage
     */
    private loadFromStorage;
    /**
     * Export news data
     */
    exportData(): string;
    /**
     * Import news data
     */
    importData(data: string): boolean;
}
export declare const newsService: NewsService;
//# sourceMappingURL=news-service.d.ts.map