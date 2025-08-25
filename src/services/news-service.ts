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

export class NewsService {
    private static instance: NewsService;
    private newsData: NewsItem[] = [];

    private constructor() {
        this.loadInitialData();
    }

    public static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService();
        }
        return NewsService.instance;
    }

    /**
     * Load initial news data
     */
    private loadInitialData(): void {
        // Sample data - in real app this would come from API
        this.newsData = [
            {
                id: '1',
                title: 'Ekonomide Büyüme Rakamları Açıklandı',
                category: 'baskanlik',
                date: '19.06.2024',
                description: 'Bu yılın ikinci çeyreğinde ekonomi %5.2 büyüdü',
                imageUrl: '../assets/images/gebze-belediyesi.ico'
            },
            {
                id: '2',
                title: 'Basketbol Takımımız Gruplardan Çıktı',
                category: 'baskanlik',
                date: '15.09.2023',
                description: 'Turnuvada bir üst tura yükseldi',
                imageUrl: '../assets/images/gebze-belediyesi.ico'
            }
        ];
    }

    /**
     * Get all news items
     */
    public getAllNews(): NewsItem[] {
        return [...this.newsData];
    }

    /**
     * Get news by ID
     */
    public getNewsById(id: string): NewsItem | undefined {
        return this.newsData.find(news => news.id === id);
    }

    /**
     * Filter news by criteria
     */
    public filterNews(filter: NewsFilter): NewsItem[] {
        return this.newsData.filter(news => {
            if (filter.category && news.category !== filter.category) {
                return false;
            }

            if (filter.search && !news.title.toLowerCase().includes(filter.search.toLowerCase())) {
                return false;
            }

            if (filter.dateFrom && new Date(news.date) < new Date(filter.dateFrom)) {
                return false;
            }

            if (filter.dateTo && new Date(news.date) > new Date(filter.dateTo)) {
                return false;
            }

            return true;
        });
    }

    /**
     * Create new news item
     */
    public createNews(data: NewsCreateData): NewsItem {
        const newNews: NewsItem = {
            id: this.generateId(),
            ...data
        };

        this.newsData.push(newNews);
        this.saveToStorage();

        return newNews;
    }

    /**
     * Update existing news item
     */
    public updateNews(data: NewsUpdateData): NewsItem | null {
        const index = this.newsData.findIndex(news => news.id === data.id);

        if (index === -1) {
            return null;
        }

        this.newsData[index] = { ...this.newsData[index], ...data };
        this.saveToStorage();

        return this.newsData[index];
    }

    /**
     * Delete news item
     */
    public deleteNews(id: string): boolean {
        const index = this.newsData.findIndex(news => news.id === id);

        if (index === -1) {
            return false;
        }

        this.newsData.splice(index, 1);
        this.saveToStorage();

        return true;
    }

    /**
     * Delete multiple news items
     */
    public deleteMultipleNews(ids: string[]): number {
        let deletedCount = 0;

        ids.forEach(id => {
            if (this.deleteNews(id)) {
                deletedCount++;
            }
        });

        return deletedCount;
    }

    /**
     * Generate unique ID
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Save data to localStorage
     */
    private saveToStorage(): void {
        try {
            localStorage.setItem('gebze_news_data', JSON.stringify(this.newsData));
        } catch (error) {
            console.warn('Failed to save news data to storage:', error);
        }
    }

    /**
     * Load data from localStorage
     */
    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem('gebze_news_data');
            if (stored) {
                this.newsData = JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to load news data from storage:', error);
        }
    }

    /**
     * Export news data
     */
    public exportData(): string {
        return JSON.stringify(this.newsData, null, 2);
    }

    /**
     * Import news data
     */
    public importData(data: string): boolean {
        try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                this.newsData = parsed;
                this.saveToStorage();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to import news data:', error);
            return false;
        }
    }
}

// Export singleton instance
export const newsService = NewsService.getInstance(); 