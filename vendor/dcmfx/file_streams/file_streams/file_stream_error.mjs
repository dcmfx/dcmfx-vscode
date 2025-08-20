/// <reference types="./file_stream_error.d.mts" />
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class Eacces extends $CustomType {}

export class Eagain extends $CustomType {}

export class Ebadf extends $CustomType {}

export class Ebadmsg extends $CustomType {}

export class Ebusy extends $CustomType {}

export class Edeadlk extends $CustomType {}

export class Edeadlock extends $CustomType {}

export class Edquot extends $CustomType {}

export class Eexist extends $CustomType {}

export class Efault extends $CustomType {}

export class Efbig extends $CustomType {}

export class Eftype extends $CustomType {}

export class Eintr extends $CustomType {}

export class Einval extends $CustomType {}

export class Eio extends $CustomType {}

export class Eisdir extends $CustomType {}

export class Eloop extends $CustomType {}

export class Emfile extends $CustomType {}

export class Emlink extends $CustomType {}

export class Emultihop extends $CustomType {}

export class Enametoolong extends $CustomType {}

export class Enfile extends $CustomType {}

export class Enobufs extends $CustomType {}

export class Enodev extends $CustomType {}

export class Enolck extends $CustomType {}

export class Enolink extends $CustomType {}

export class Enoent extends $CustomType {}

export class Enomem extends $CustomType {}

export class Enospc extends $CustomType {}

export class Enosr extends $CustomType {}

export class Enostr extends $CustomType {}

export class Enosys extends $CustomType {}

export class Enotblk extends $CustomType {}

export class Enotdir extends $CustomType {}

export class Enotsup extends $CustomType {}

export class Enxio extends $CustomType {}

export class Eopnotsupp extends $CustomType {}

export class Eoverflow extends $CustomType {}

export class Eperm extends $CustomType {}

export class Epipe extends $CustomType {}

export class Erange extends $CustomType {}

export class Erofs extends $CustomType {}

export class Espipe extends $CustomType {}

export class Esrch extends $CustomType {}

export class Estale extends $CustomType {}

export class Etxtbsy extends $CustomType {}

export class Exdev extends $CustomType {}

export class Eof extends $CustomType {}

/**
 * Text data was encountered that can't be converted from/to the relevant
 * text encoding. E.g. trying to write Chinese characters to a file stream
 * opened with the `Latin1` encoding.
 */
export class NoTranslation extends $CustomType {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }
}

export class InvalidUnicode extends $CustomType {}

/**
 * Returns a human-readable description of a file stream error.
 */
export function describe(error) {
  if (error instanceof Eacces) {
    return "Permission denied";
  } else if (error instanceof Eagain) {
    return "Resource temporarily unavailable";
  } else if (error instanceof Ebadf) {
    return "Bad file number";
  } else if (error instanceof Ebadmsg) {
    return "Bad message";
  } else if (error instanceof Ebusy) {
    return "File busy";
  } else if (error instanceof Edeadlk) {
    return "Resource deadlock avoided";
  } else if (error instanceof Edeadlock) {
    return "File locking deadlock error";
  } else if (error instanceof Edquot) {
    return "Disk quota exceeded";
  } else if (error instanceof Eexist) {
    return "File already exists";
  } else if (error instanceof Efault) {
    return "Bad address in system call argument";
  } else if (error instanceof Efbig) {
    return "File too large";
  } else if (error instanceof Eftype) {
    return "Inappropriate file type or format";
  } else if (error instanceof Eintr) {
    return "Interrupted system call";
  } else if (error instanceof Einval) {
    return "Invalid argument";
  } else if (error instanceof Eio) {
    return "I/O error";
  } else if (error instanceof Eisdir) {
    return "Illegal operation on a directory";
  } else if (error instanceof Eloop) {
    return "Too many levels of symbolic links";
  } else if (error instanceof Emfile) {
    return "Too many open files";
  } else if (error instanceof Emlink) {
    return "Too many links";
  } else if (error instanceof Emultihop) {
    return "Multihop attempted";
  } else if (error instanceof Enametoolong) {
    return "Filename too long";
  } else if (error instanceof Enfile) {
    return "File table overflow";
  } else if (error instanceof Enobufs) {
    return "No buffer space available";
  } else if (error instanceof Enodev) {
    return "No such device";
  } else if (error instanceof Enolck) {
    return "No locks available";
  } else if (error instanceof Enolink) {
    return "Link has been severed";
  } else if (error instanceof Enoent) {
    return "No such file or directory";
  } else if (error instanceof Enomem) {
    return "Not enough memory";
  } else if (error instanceof Enospc) {
    return "No space left on device";
  } else if (error instanceof Enosr) {
    return "No stream resources";
  } else if (error instanceof Enostr) {
    return "Not a stream";
  } else if (error instanceof Enosys) {
    return "Function not implemented";
  } else if (error instanceof Enotblk) {
    return "Block device required";
  } else if (error instanceof Enotdir) {
    return "Not a directory";
  } else if (error instanceof Enotsup) {
    return "Operation not supported";
  } else if (error instanceof Enxio) {
    return "No such device or address";
  } else if (error instanceof Eopnotsupp) {
    return "Operation not supported on socket";
  } else if (error instanceof Eoverflow) {
    return "Value too large to be stored in data type";
  } else if (error instanceof Eperm) {
    return "Permission denied due to file ownership";
  } else if (error instanceof Epipe) {
    return "Broken pipe";
  } else if (error instanceof Erange) {
    return "Result too large";
  } else if (error instanceof Erofs) {
    return "Read-only file system";
  } else if (error instanceof Espipe) {
    return "Invalid seek";
  } else if (error instanceof Esrch) {
    return "No such process";
  } else if (error instanceof Estale) {
    return "Stale remote file handle";
  } else if (error instanceof Etxtbsy) {
    return "Text file busy";
  } else if (error instanceof Exdev) {
    return "Cross-domain link";
  } else if (error instanceof Eof) {
    return "End of file stream";
  } else if (error instanceof NoTranslation) {
    return "Unable to convert encoding";
  } else {
    return "Invalid bytes for Unicode encoding";
  }
}
