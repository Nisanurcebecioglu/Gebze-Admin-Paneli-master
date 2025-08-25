/**
 * News Table Component for Gebze Admin Panel
 * Handles news table display and interactions
 */

import { newsService, NewsFilter } from '../services/news-service';
import { NewsItem } from '../types/news.types';

export interface NewsTableOptions {
    enableSearch?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    itemsPerPage?: number;
}

export class NewsTable {
    private container: HTMLElement;
    private options: Required<NewsTableOptions>;
    private currentFilter: NewsFilter = {};
    private currentPage: number = 1;
    private selectedItems: Set<string> = new Set();

    constructor(container: HTMLElement, options: NewsTableOptions = {}) {
        this.container = container;
        this.options = {
            enableSearch: options.enableSearch ?? true,
            enableFiltering: options.enableFiltering ?? true,
            enablePagination: options.enablePagination ?? true,
            itemsPerPage: options.itemsPerPage ?? 10
        };

        this.initialize();
    }

    /**
     * Initialize the news table
     */
    private initialize(): void {
        this.render();
        this.bindEvents();
        this.loadData();
    }

    /**
     * Render the table structure
     */
    private render(): void {
        this.container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h5>Haberler</h5>
        </div>
        <div class="card-body">
          ${this.renderToolbar()}
          ${this.renderTable()}
          ${this.renderPagination()}
        </div>
      </div>
    `;
    }

    /**
     * Render the toolbar with search and filters
     */
    private renderToolbar(): string {
        if (!this.options.enableSearch && !this.options.enableFiltering) {
            return '';
        }

        return `
      <div class="row mb-3">
        ${this.options.enableSearch ? `
          <div class="col-md-4">
            <div class="input-group">
              <input type="text" class="form-control" id="news-search" placeholder="Haber ara...">
              <button class="btn btn-outline-secondary" type="button" id="search-btn">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        ` : ''}
        ${this.options.enableFiltering ? `
          <div class="col-md-4">
            <select class="form-select" id="category-filter">
              <option value="">Tüm Kategoriler</option>
              <option value="yonetim">Yönetim</option>
              <option value="baskanlik">Başkanlık</option>
              <option value="halk">Halk</option>
              <option value="genel">Genel</option>
            </select>
          </div>
        ` : ''}
        <div class="col-md-4 text-end">
          <button class="btn btn-primary" id="add-news-btn">
            <i class="fa fa-plus"></i> Yeni Haber
          </button>
        </div>
      </div>
    `;
    }

    /**
     * Render the main table
     */
    private renderTable(): string {
        return `
      <div class="table-responsive">
        <table class="table table-striped table-hover" id="news-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="select-all" class="form-check-input">
              </th>
              <th>Başlık</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody id="news-tbody">
            <!-- News items will be loaded here -->
          </tbody>
        </table>
      </div>
    `;
    }

    /**
     * Render pagination controls
     */
    private renderPagination(): string {
        if (!this.options.enablePagination) {
            return '';
        }

        return `
      <nav aria-label="Haber sayfaları">
        <ul class="pagination justify-content-center" id="pagination">
          <!-- Pagination will be generated here -->
        </ul>
      </nav>
    `;
    }

    /**
     * Bind event listeners
     */
    private bindEvents(): void {
        // Search functionality
        const searchInput = this.container.querySelector('#news-search') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                this.currentFilter.search = target.value;
                this.currentPage = 1;
                this.loadData();
            });
        }

        // Category filter
        const categoryFilter = this.container.querySelector('#category-filter') as HTMLSelectElement;
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.currentFilter.category = target.value as any || undefined;
                this.currentPage = 1;
                this.loadData();
            });
        }

        // Select all checkbox
        const selectAll = this.container.querySelector('#select-all') as HTMLInputElement;
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                this.toggleSelectAll(target.checked);
            });
        }

        // Add news button
        const addBtn = this.container.querySelector('#add-news-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showAddNewsModal();
            });
        }
    }

    /**
     * Load and display news data
     */
    private loadData(): void {
        const news = newsService.filterNews(this.currentFilter);
        this.displayNews(news);
        this.updatePagination(news.length);
    }

    /**
     * Display news items in the table
     */
    private displayNews(news: NewsItem[]): void {
        const tbody = this.container.querySelector('#news-tbody');
        if (!tbody) return;

        const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
        const endIndex = startIndex + this.options.itemsPerPage;
        const pageNews = news.slice(startIndex, endIndex);

        tbody.innerHTML = pageNews.map(item => `
      <tr data-id="${item.id}">
        <td>
          <input type="checkbox" class="form-check-input news-checkbox" value="${item.id}">
        </td>
        <td>${item.title}</td>
        <td>
          <span class="badge bg-primary">${this.getCategoryLabel(item.category)}</span>
        </td>
        <td>${item.date}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary edit-news" data-id="${item.id}">
            <i class="fa fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger delete-news" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');

        // Bind row events
        this.bindRowEvents();
    }

    /**
     * Bind events for table rows
     */
    private bindRowEvents(): void {
        // Edit buttons
        this.container.querySelectorAll('.edit-news').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const id = target.closest('button')?.getAttribute('data-id');
                if (id) this.editNews(id);
            });
        });

        // Delete buttons
        this.container.querySelectorAll('.delete-news').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const id = target.closest('button')?.getAttribute('data-id');
                if (id) this.deleteNews(id);
            });
        });

        // Checkboxes
        this.container.querySelectorAll('.news-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                this.toggleItemSelection(target.value, target.checked);
            });
        });
    }

    /**
     * Update pagination controls
     */
    private updatePagination(totalItems: number): void {
        if (!this.options.enablePagination) return;

        const pagination = this.container.querySelector('#pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(totalItems / this.options.itemsPerPage);
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage - 1}">Önceki</a>
      </li>
    `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
        }

        // Next button
        paginationHTML += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage + 1}">Sonraki</a>
      </li>
    `;

        pagination.innerHTML = paginationHTML;

        // Bind pagination events
        pagination.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;
                const page = parseInt(target.getAttribute('data-page') || '1');
                if (page >= 1 && page <= totalPages) {
                    this.currentPage = page;
                    this.loadData();
                }
            });
        });
    }

    /**
     * Get category label in Turkish
     */
    private getCategoryLabel(category: string): string {
        const labels: Record<string, string> = {
            'yonetim': 'Yönetim',
            'baskanlik': 'Başkanlık',
            'halk': 'Halk',
            'genel': 'Genel'
        };
        return labels[category] || category;
    }

    /**
     * Toggle select all functionality
     */
    private toggleSelectAll(checked: boolean): void {
        const checkboxes = this.container.querySelectorAll('.news-checkbox') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            this.toggleItemSelection(checkbox.value, checked);
        });
    }

    /**
     * Toggle individual item selection
     */
    private toggleItemSelection(id: string, selected: boolean): void {
        if (selected) {
            this.selectedItems.add(id);
        } else {
            this.selectedItems.delete(id);
        }
        this.updateSelectAllState();
    }

    /**
     * Update select all checkbox state
     */
    private updateSelectAllState(): void {
        const selectAll = this.container.querySelector('#select-all') as HTMLInputElement;
        if (!selectAll) return;

        const checkboxes = this.container.querySelectorAll('.news-checkbox') as NodeListOf<HTMLInputElement>;
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

        selectAll.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
        selectAll.checked = checkedCount === checkboxes.length;
    }

    /**
     * Show add news modal
     */
    private showAddNewsModal(): void {
        // Implementation for add news modal
        console.log('Show add news modal');
    }

    /**
     * Edit news item
     */
    private editNews(id: string): void {
        // Implementation for edit news
        console.log('Edit news:', id);
    }

    /**
     * Delete news item
     */
    private deleteNews(id: string): void {
        if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
            if (newsService.deleteNews(id)) {
                this.loadData();
                alert('Haber başarıyla silindi.');
            } else {
                alert('Haber silinirken bir hata oluştu.');
            }
        }
    }

    /**
     * Get selected news IDs
     */
    public getSelectedNewsIds(): string[] {
        return Array.from(this.selectedItems);
    }

    /**
     * Refresh the table data
     */
    public refresh(): void {
        this.loadData();
    }

    /**
     * Destroy the component
     */
    public destroy(): void {
        this.container.innerHTML = '';
        this.selectedItems.clear();
    }
} 