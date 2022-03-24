import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { renameProperties } from './aliasing.helper';

// TODO: Add support for nested fields
// TODO: Pass the document.data selection from constructor
// TODO: Add pick interceptor for picking out certain fields only
@Injectable()
export class AliasingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let { attribs, rename } = request.query;

    if (!attribs || !rename) { return next.handle(); }

    attribs = attribs.split(",").map(attrib => attrib.trim())
    rename = rename.split(",").map(attrib => attrib.trim())

    if (attribs.length !== rename.length) { return next.handle(); }

    return next.handle().pipe(
      map(
        (documents) => {
          if (!Array.isArray(documents) && !Array.isArray(documents.data)) {
            // Managing output of findOne
            documents._doc = renameProperties(attribs, rename, documents._doc)
          } else {
            (!Array.isArray(documents) ? documents.data : documents).forEach(
              // Managing output of findMany/find
              (doc) => doc._doc = renameProperties(attribs, rename, doc._doc)
            )
          }
          return documents
        }
      )
    )
  }
}
