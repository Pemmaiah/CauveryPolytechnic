import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Download, Filter } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFilter?: (item: T, term: string) => boolean;
  filterOptions?: {
    label: string;
    key: keyof T;
    values: { label: string; value: any }[];
  }[];
  onExportCsv?: () => void;
  exportFileName?: string;
  pageSize?: number;
  emptyMessage?: string;
  actions?: React.ReactNode;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filterOptions,
  onExportCsv,
  exportFileName = 'export.csv',
  pageSize = 10,
  emptyMessage = 'No records found.',
  actions
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      if (searchFilter) {
        result = result.filter((item) => searchFilter(item, term));
      } else {
        result = result.filter((item) =>
          Object.values(item as any).some(
            (val) => val && String(val).toLowerCase().includes(term)
          )
        );
      }
    }

    // Dropdown filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue && filterValue !== 'ALL') {
        result = result.filter((item) => String((item as any)[filterKey]) === filterValue);
      }
    });

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const valA = (a as any)[sortConfig.key];
        const valB = (b as any)[sortConfig.key];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (sortConfig.direction === 'asc') {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
    }

    return result;
  }, [data, searchTerm, searchFilter, activeFilters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const exportToCsv = () => {
    if (onExportCsv) {
      onExportCsv();
      return;
    }
    if (data.length === 0) return;

    const headers = columns
      .filter((c) => c.accessorKey)
      .map((c) => `"${c.header}"`)
      .join(',');

    const rows = filteredData.map((item) =>
      columns
        .filter((c) => c.accessorKey)
        .map((c) => {
          const val = (item as any)[c.accessorKey as any] || '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', exportFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Top Bar: Search, Filters, Actions */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex flex-1 items-center gap-3 flex-wrap">
          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-sm flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs md:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>

          {/* Filter Dropdowns */}
          {filterOptions?.map((filter) => (
            <div key={String(filter.key)} className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
                {filter.label}:
              </span>
              <select
                value={activeFilters[String(filter.key)] || 'ALL'}
                onChange={(e) => handleFilterChange(String(filter.key), e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-blue-900/20"
              >
                <option value="ALL">All {filter.label}s</option>
                {filter.values.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Right side controls (Export, custom actions) */}
        <div className="flex items-center gap-2">
          {actions}
          <button
            type="button"
            onClick={exportToCsv}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 text-xs uppercase font-bold tracking-wider">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && col.accessorKey && handleSort(col.accessorKey)}
                  className={`p-3.5 ${col.sortable ? 'cursor-pointer hover:bg-slate-200/60 select-none' : ''} ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={(row as any).id || rowIdx} className="hover:bg-blue-50/30 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`p-3.5 ${col.className || ''}`}>
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String((row as any)[col.accessorKey] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-slate-700 px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
