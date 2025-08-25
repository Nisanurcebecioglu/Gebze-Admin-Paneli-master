/**
 * News Table Component for Gebze Admin Panel
 * Handles news table display and interactions
 */
export interface NewsTableOptions {
    enableSearch?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    itemsPerPage?: number;
}
export declare class NewsTable {
    private container;
    private options;
    private currentFilter;
    private currentPage;
    private selectedItems;
    constructor(container: HTMLElement, options?: NewsTableOptions);
    /**
     * Initialize the news table
     */
    private initialize;
    /**
     * Render the table structure
     */
    private render;
    /**
     * Render the toolbar with search and filters
     */
    private renderToolbar;
    /**
     * Render the main table
     */
    private renderTable;
    /**
     * Render pagination controls
     */
    private renderPagination;
    /**
     * Bind event listeners
     */
    private bindEvents;
    /**
     * Load and display news data
     */
    private loadData;
    /**
     * Display news items in the table
     */
    private displayNews;
    /**
     * Bind events for table rows
     */
    private bindRowEvents;
    /**
     * Update pagination controls
     */
    private updatePagination;
    /**
     * Get category label in Turkish
     */
    private getCategoryLabel;
    /**
     * Toggle select all functionality
     */
    private toggleSelectAll;
    /**
     * Toggle individual item selection
     */
    private toggleItemSelection;
    /**
     * Update select all checkbox state
     */
    private updateSelectAllState;
    /**
     * Show add news modal
     */
    private showAddNewsModal;
    /**
     * Edit news item
     */
    private editNews;
    /**
     * Delete news item
     */
    private deleteNews;
    /**
     * Get selected news IDs
     */
    getSelectedNewsIds(): string[];
    /**
     * Refresh the table data
     */
    refresh(): void;
    /**
     * Destroy the component
     */
    destroy(): void;
}
//# sourceMappingURL=news-table.d.ts.map