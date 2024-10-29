import type * as $text_encoding from "../file_streams/text_encoding.d.mts";
import type * as _ from "../gleam.d.mts";

export class Eacces extends _.CustomType {}

export class Eagain extends _.CustomType {}

export class Ebadf extends _.CustomType {}

export class Ebadmsg extends _.CustomType {}

export class Ebusy extends _.CustomType {}

export class Edeadlk extends _.CustomType {}

export class Edeadlock extends _.CustomType {}

export class Edquot extends _.CustomType {}

export class Eexist extends _.CustomType {}

export class Efault extends _.CustomType {}

export class Efbig extends _.CustomType {}

export class Eftype extends _.CustomType {}

export class Eintr extends _.CustomType {}

export class Einval extends _.CustomType {}

export class Eio extends _.CustomType {}

export class Eisdir extends _.CustomType {}

export class Eloop extends _.CustomType {}

export class Emfile extends _.CustomType {}

export class Emlink extends _.CustomType {}

export class Emultihop extends _.CustomType {}

export class Enametoolong extends _.CustomType {}

export class Enfile extends _.CustomType {}

export class Enobufs extends _.CustomType {}

export class Enodev extends _.CustomType {}

export class Enolck extends _.CustomType {}

export class Enolink extends _.CustomType {}

export class Enoent extends _.CustomType {}

export class Enomem extends _.CustomType {}

export class Enospc extends _.CustomType {}

export class Enosr extends _.CustomType {}

export class Enostr extends _.CustomType {}

export class Enosys extends _.CustomType {}

export class Enotblk extends _.CustomType {}

export class Enotdir extends _.CustomType {}

export class Enotsup extends _.CustomType {}

export class Enxio extends _.CustomType {}

export class Eopnotsupp extends _.CustomType {}

export class Eoverflow extends _.CustomType {}

export class Eperm extends _.CustomType {}

export class Epipe extends _.CustomType {}

export class Erange extends _.CustomType {}

export class Erofs extends _.CustomType {}

export class Espipe extends _.CustomType {}

export class Esrch extends _.CustomType {}

export class Estale extends _.CustomType {}

export class Etxtbsy extends _.CustomType {}

export class Exdev extends _.CustomType {}

export class Eof extends _.CustomType {}

export class NoTranslation extends _.CustomType {
  constructor(
    from: $text_encoding.TextEncoding$,
    to: $text_encoding.TextEncoding$
  );
  
  from: $text_encoding.TextEncoding$;
  to: $text_encoding.TextEncoding$;
}

export class InvalidUnicode extends _.CustomType {}

export type FileStreamError$ = Eacces | Eagain | Ebadf | Ebadmsg | Ebusy | Edeadlk | Edeadlock | Edquot | Eexist | Efault | Efbig | Eftype | Eintr | Einval | Eio | Eisdir | Eloop | Emfile | Emlink | Emultihop | Enametoolong | Enfile | Enobufs | Enodev | Enolck | Enolink | Enoent | Enomem | Enospc | Enosr | Enostr | Enosys | Enotblk | Enotdir | Enotsup | Enxio | Eopnotsupp | Eoverflow | Eperm | Epipe | Erange | Erofs | Espipe | Esrch | Estale | Etxtbsy | Exdev | Eof | NoTranslation | InvalidUnicode;

export function describe(error: FileStreamError$): string;
