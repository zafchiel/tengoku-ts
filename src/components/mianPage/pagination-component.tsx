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
import { PaginationInfoType } from "@/types";

type PaginationProps = {
  paginationInfo: PaginationInfoType;
};

export function PaginationComponent({ paginationInfo }: PaginationProps) {
  const pagination = usePagination({
    totalCount: paginationInfo?.items.total ?? 0,
    pageSize: paginationInfo?.items.per_page ?? 0,
    currentPage: paginationInfo?.items.count ?? 1,
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
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
                  <PaginationLink href="#">{page}</PaginationLink>
                </PaginationItem>
              );
            }
        })}

        

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
