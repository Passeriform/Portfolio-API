import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { renameProperties } from './aliasing.helper';

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
          (!Array.isArray(documents) ? documents.data : documents).map(
            (document) => renameProperties(attribs, rename, document._doc)
          )
          return documents
        }
      )
    )
  }
}
