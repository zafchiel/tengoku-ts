import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { PaginationInfoType } from "@/types";

type PaginationProps = {
  paginationInfo: PaginationInfoType;
  activePage: number;
  query: string;
};

export function PaginationComponent({ paginationInfo, activePage, query }: PaginationProps) {
  const pagination = usePagination({
    totalCount: paginationInfo?.items.total ?? 0,
    pageSize: paginationInfo?.items.per_page ?? 0,
    currentPage: paginationInfo?.items.count ?? 1,
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={cn(activePage <= 1 && "pointer-events-none opacity-40")} href={`/search?q=${query}&page=${activePage - 1}`} />
        </PaginationItem>

        {pagination?.map((page, index) => {
            if (page === "...") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else if (typeof page === "number") {
              return (
                <PaginationItem key={index}>
                  <PaginationLink href={`/search?q=${query}&page=${page}`} isActive={activePage === page}>{page}</PaginationLink>
                </PaginationItem>
              );
            }
        })}

        <PaginationItem>
          <PaginationNext className={cn(activePage >= paginationInfo.last_visible_page && "pointer-events-none opacity-40")} href={`/search?q=${query}&page=${activePage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
