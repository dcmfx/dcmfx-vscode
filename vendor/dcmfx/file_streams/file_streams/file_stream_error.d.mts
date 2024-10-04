import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

export class Eacces extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eacces: never;
}

export class Eagain extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eagain: never;
}

export class Ebadf extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Ebadf: never;
}

export class Ebadmsg extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Ebadmsg: never;
}

export class Ebusy extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Ebusy: never;
}

export class Edeadlk extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Edeadlk: never;
}

export class Edeadlock extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Edeadlock: never;
}

export class Edquot extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Edquot: never;
}

export class Eexist extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eexist: never;
}

export class Efault extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Efault: never;
}

export class Efbig extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Efbig: never;
}

export class Eftype extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eftype: never;
}

export class Eintr extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eintr: never;
}

export class Einval extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Einval: never;
}

export class Eio extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eio: never;
}

export class Eisdir extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eisdir: never;
}

export class Eloop extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eloop: never;
}

export class Emfile extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Emfile: never;
}

export class Emlink extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Emlink: never;
}

export class Emultihop extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Emultihop: never;
}

export class Enametoolong extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enametoolong: never;
}

export class Enfile extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enfile: never;
}

export class Enobufs extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enobufs: never;
}

export class Enodev extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enodev: never;
}

export class Enolck extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enolck: never;
}

export class Enolink extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enolink: never;
}

export class Enoent extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enoent: never;
}

export class Enomem extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enomem: never;
}

export class Enospc extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enospc: never;
}

export class Enosr extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enosr: never;
}

export class Enostr extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enostr: never;
}

export class Enosys extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enosys: never;
}

export class Enotblk extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enotblk: never;
}

export class Enotdir extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enotdir: never;
}

export class Enotsup extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enotsup: never;
}

export class Enxio extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Enxio: never;
}

export class Eopnotsupp extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eopnotsupp: never;
}

export class Eoverflow extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eoverflow: never;
}

export class Eperm extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eperm: never;
}

export class Epipe extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Epipe: never;
}

export class Erange extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Erange: never;
}

export class Erofs extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Erofs: never;
}

export class Espipe extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Espipe: never;
}

export class Esrch extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Esrch: never;
}

export class Estale extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Estale: never;
}

export class Etxtbsy extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Etxtbsy: never;
}

export class Exdev extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Exdev: never;
}

export class Eof extends _.CustomType {
  private __gleam__file_streams__file_stream_error__Eof: never;
}

export class NoTranslation extends _.CustomType {
  private __gleam__file_streams__file_stream_error__NoTranslation: never;

  constructor(
    from: $text_encoding.TextEncoding$,
    to: $text_encoding.TextEncoding$
  );
  
  from: $text_encoding.TextEncoding$;
  to: $text_encoding.TextEncoding$;
}

export class InvalidUnicode extends _.CustomType {
  private __gleam__file_streams__file_stream_error__InvalidUnicode: never;
}

export type FileStreamError$ = Eacces | Eagain | Ebadf | Ebadmsg | Ebusy | Edeadlk | Edeadlock | Edquot | Eexist | Efault | Efbig | Eftype | Eintr | Einval | Eio | Eisdir | Eloop | Emfile | Emlink | Emultihop | Enametoolong | Enfile | Enobufs | Enodev | Enolck | Enolink | Enoent | Enomem | Enospc | Enosr | Enostr | Enosys | Enotblk | Enotdir | Enotsup | Enxio | Eopnotsupp | Eoverflow | Eperm | Epipe | Erange | Erofs | Espipe | Esrch | Estale | Etxtbsy | Exdev | Eof | NoTranslation | InvalidUnicode;

export function describe(error: FileStreamError$): string;
