import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedResponse<T> {
  total: number
  showing: string
  total_pages_for_current_epp: number
  absolute_page_limit: number
  absolute_epp_limit: number
  page: number
  entries_per_page: number
  data: T[]
  issues: string[]
  prev: string
  next: string
}

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<PaginatedResponse<T>> {
    const absolute_page_limit = 10000
    const absolute_epp_limit = 100

    const request = context.switchToHttp().getRequest();

    const page = parseInt(request.query.page);
    const epp = parseInt(request.query.epp ?? "5");

    if (!page || !epp) { return next.handle(); }

    const restrictedPage = Math.min(page, absolute_page_limit);
    const restrictedEpp = Math.min(epp, absolute_epp_limit);

    // TODO: Pass it inside controller where it can be used in the find query. Keep the other logic as well in-case new controllers forget to implement the paging system

    const startIdx = (restrictedPage - 1) * restrictedEpp;
    const endIdx = restrictedPage * restrictedEpp;

    return next.handle().pipe(
      map(documents => {
        const { protocol, hostname, url } = request

        const isFirstPage = page === 1
        const isLastPage = page === Math.ceil(documents.length / epp)

        const currPage = `${protocol}://${hostname}${url}`
        const prevPage = isFirstPage ? null : currPage.replace(/(.*page=)(\d+)(&)/g, `$1${page - 1}$3`)
        const nextPage = isLastPage ? null : currPage.replace(/(.*page=)(\d+)(&)/g, `$1${page + 1}$3`)

        return {
          total: documents.length,
          showing: `${startIdx + 1}-${Math.min(endIdx, documents.length)}`,
          total_pages_for_current_epp: Math.ceil(documents.length / epp),
          absolute_page_limit,
          absolute_epp_limit,
          page: restrictedPage,
          entries_per_page: restrictedEpp,
          data: documents.slice(startIdx, Math.min(endIdx, documents.length)),
          issues: [],
          prev: prevPage,
          next: nextPage
        }
      })
    )
  }
}
