import React from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ meta, page, setPage, limit, setLimit, className = "", ...props }, ref) => {
    if (!meta) return null;

    return (
      <div
        ref={ref}
        className={`flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0 ${className}`}
        {...props}
      >
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-500">
            Menampilkan{" "}
            <span className="font-medium">
              {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
            </span>{" "}
            hingga{" "}
            <span className="font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            dari <span className="font-medium">{meta.total}</span> data
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">Tampilkan:</span>
            <select
              className="border border-slate-300 rounded-md text-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        {meta.totalPages > 1 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              disabled={page === meta.totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
