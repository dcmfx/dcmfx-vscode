import type * as $set from "../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "./gleam.d.mts";

export class Eacces extends _.CustomType {
  private __gleam__simplifile__Eacces: never;
}

export class Eagain extends _.CustomType {
  private __gleam__simplifile__Eagain: never;
}

export class Ebadf extends _.CustomType {
  private __gleam__simplifile__Ebadf: never;
}

export class Ebadmsg extends _.CustomType {
  private __gleam__simplifile__Ebadmsg: never;
}

export class Ebusy extends _.CustomType {
  private __gleam__simplifile__Ebusy: never;
}

export class Edeadlk extends _.CustomType {
  private __gleam__simplifile__Edeadlk: never;
}

export class Edeadlock extends _.CustomType {
  private __gleam__simplifile__Edeadlock: never;
}

export class Edquot extends _.CustomType {
  private __gleam__simplifile__Edquot: never;
}

export class Eexist extends _.CustomType {
  private __gleam__simplifile__Eexist: never;
}

export class Efault extends _.CustomType {
  private __gleam__simplifile__Efault: never;
}

export class Efbig extends _.CustomType {
  private __gleam__simplifile__Efbig: never;
}

export class Eftype extends _.CustomType {
  private __gleam__simplifile__Eftype: never;
}

export class Eintr extends _.CustomType {
  private __gleam__simplifile__Eintr: never;
}

export class Einval extends _.CustomType {
  private __gleam__simplifile__Einval: never;
}

export class Eio extends _.CustomType {
  private __gleam__simplifile__Eio: never;
}

export class Eisdir extends _.CustomType {
  private __gleam__simplifile__Eisdir: never;
}

export class Eloop extends _.CustomType {
  private __gleam__simplifile__Eloop: never;
}

export class Emfile extends _.CustomType {
  private __gleam__simplifile__Emfile: never;
}

export class Emlink extends _.CustomType {
  private __gleam__simplifile__Emlink: never;
}

export class Emultihop extends _.CustomType {
  private __gleam__simplifile__Emultihop: never;
}

export class Enametoolong extends _.CustomType {
  private __gleam__simplifile__Enametoolong: never;
}

export class Enfile extends _.CustomType {
  private __gleam__simplifile__Enfile: never;
}

export class Enobufs extends _.CustomType {
  private __gleam__simplifile__Enobufs: never;
}

export class Enodev extends _.CustomType {
  private __gleam__simplifile__Enodev: never;
}

export class Enolck extends _.CustomType {
  private __gleam__simplifile__Enolck: never;
}

export class Enolink extends _.CustomType {
  private __gleam__simplifile__Enolink: never;
}

export class Enoent extends _.CustomType {
  private __gleam__simplifile__Enoent: never;
}

export class Enomem extends _.CustomType {
  private __gleam__simplifile__Enomem: never;
}

export class Enospc extends _.CustomType {
  private __gleam__simplifile__Enospc: never;
}

export class Enosr extends _.CustomType {
  private __gleam__simplifile__Enosr: never;
}

export class Enostr extends _.CustomType {
  private __gleam__simplifile__Enostr: never;
}

export class Enosys extends _.CustomType {
  private __gleam__simplifile__Enosys: never;
}

export class Enotblk extends _.CustomType {
  private __gleam__simplifile__Enotblk: never;
}

export class Enotdir extends _.CustomType {
  private __gleam__simplifile__Enotdir: never;
}

export class Enotsup extends _.CustomType {
  private __gleam__simplifile__Enotsup: never;
}

export class Enxio extends _.CustomType {
  private __gleam__simplifile__Enxio: never;
}

export class Eopnotsupp extends _.CustomType {
  private __gleam__simplifile__Eopnotsupp: never;
}

export class Eoverflow extends _.CustomType {
  private __gleam__simplifile__Eoverflow: never;
}

export class Eperm extends _.CustomType {
  private __gleam__simplifile__Eperm: never;
}

export class Epipe extends _.CustomType {
  private __gleam__simplifile__Epipe: never;
}

export class Erange extends _.CustomType {
  private __gleam__simplifile__Erange: never;
}

export class Erofs extends _.CustomType {
  private __gleam__simplifile__Erofs: never;
}

export class Espipe extends _.CustomType {
  private __gleam__simplifile__Espipe: never;
}

export class Esrch extends _.CustomType {
  private __gleam__simplifile__Esrch: never;
}

export class Estale extends _.CustomType {
  private __gleam__simplifile__Estale: never;
}

export class Etxtbsy extends _.CustomType {
  private __gleam__simplifile__Etxtbsy: never;
}

export class Exdev extends _.CustomType {
  private __gleam__simplifile__Exdev: never;
}

export class NotUtf8 extends _.CustomType {
  private __gleam__simplifile__NotUtf8: never;
}

export class Unknown extends _.CustomType {
  private __gleam__simplifile__Unknown: never;

  constructor(inner: string);
  
  inner: string;
}

export type FileError$ = Eacces | Eagain | Ebadf | Ebadmsg | Ebusy | Edeadlk | Edeadlock | Edquot | Eexist | Efault | Efbig | Eftype | Eintr | Einval | Eio | Eisdir | Eloop | Emfile | Emlink | Emultihop | Enametoolong | Enfile | Enobufs | Enodev | Enolck | Enolink | Enoent | Enomem | Enospc | Enosr | Enostr | Enosys | Enotblk | Enotdir | Enotsup | Enxio | Eopnotsupp | Eoverflow | Eperm | Epipe | Erange | Erofs | Espipe | Esrch | Estale | Etxtbsy | Exdev | NotUtf8 | Unknown;

export class FileInfo extends _.CustomType {
  private __gleam__simplifile__FileInfo: never;

  constructor(
    size: number,
    mode: number,
    nlinks: number,
    inode: number,
    user_id: number,
    group_id: number,
    dev: number,
    atime_seconds: number,
    mtime_seconds: number,
    ctime_seconds: number
  );
  
  size: number;
  mode: number;
  nlinks: number;
  inode: number;
  user_id: number;
  group_id: number;
  dev: number;
  atime_seconds: number;
  mtime_seconds: number;
  ctime_seconds: number;
}

export type FileInfo$ = FileInfo;

export class File extends _.CustomType {
  private __gleam__simplifile__File: never;
}

export class Directory extends _.CustomType {
  private __gleam__simplifile__Directory: never;
}

export class Symlink extends _.CustomType {
  private __gleam__simplifile__Symlink: never;
}

export class Other extends _.CustomType {
  private __gleam__simplifile__Other: never;
}

export type FileType$ = File | Directory | Symlink | Other;

export class Read extends _.CustomType {
  private __gleam__simplifile__Read: never;
}

export class Write extends _.CustomType {
  private __gleam__simplifile__Write: never;
}

export class Execute extends _.CustomType {
  private __gleam__simplifile__Execute: never;
}

export type Permission$ = Read | Write | Execute;

export class FilePermissions extends _.CustomType {
  private __gleam__simplifile__FilePermissions: never;

  constructor(
    user: $set.Set$<Permission$>,
    group: $set.Set$<Permission$>,
    other: $set.Set$<Permission$>
  );
  
  user: $set.Set$<Permission$>;
  group: $set.Set$<Permission$>;
  other: $set.Set$<Permission$>;
}

export type FilePermissions$ = FilePermissions;

export function describe_error(error: FileError$): string;

export function file_info_permissions_octal(file_info: FileInfo$): number;

export function file_info_type(file_info: FileInfo$): FileType$;

export function file_info(filepath: string): _.Result<FileInfo$, FileError$>;

export function link_info(filepath: string): _.Result<FileInfo$, FileError$>;

export function delete$(path: string): _.Result<undefined, FileError$>;

export function delete_all(paths: _.List<string>): _.Result<
  undefined,
  FileError$
>;

export function read_bits(filepath: string): _.Result<_.BitArray, FileError$>;

export function read(filepath: string): _.Result<string, FileError$>;

export function write_bits(filepath: string, bits: _.BitArray): _.Result<
  undefined,
  FileError$
>;

export function write(filepath: string, contents: string): _.Result<
  undefined,
  FileError$
>;

export function append_bits(filepath: string, bits: _.BitArray): _.Result<
  undefined,
  FileError$
>;

export function append(filepath: string, contents: string): _.Result<
  undefined,
  FileError$
>;

export function is_directory(filepath: string): _.Result<boolean, FileError$>;

export function create_directory(filepath: string): _.Result<
  undefined,
  FileError$
>;

export function create_symlink(target: string, symlink: string): _.Result<
  undefined,
  FileError$
>;

export function read_directory(path: string): _.Result<
  _.List<string>,
  FileError$
>;

export function is_file(filepath: string): _.Result<boolean, FileError$>;

export function is_symlink(filepath: string): _.Result<boolean, FileError$>;

export function create_file(filepath: string): _.Result<undefined, FileError$>;

export function create_directory_all(dirpath: string): _.Result<
  undefined,
  FileError$
>;

export function copy_file(src: string, dest: string): _.Result<
  undefined,
  FileError$
>;

export function rename_file(src: string, dest: string): _.Result<
  undefined,
  FileError$
>;

export function rename(src: string, dest: string): _.Result<
  undefined,
  FileError$
>;

export function copy_directory(src: string, dest: string): _.Result<
  undefined,
  FileError$
>;

export function copy(src: string, dest: string): _.Result<undefined, FileError$>;

export function rename_directory(src: string, dest: string): _.Result<
  undefined,
  FileError$
>;

export function clear_directory(path: string): _.Result<undefined, FileError$>;

export function get_files(directory: string): _.Result<
  _.List<string>,
  FileError$
>;

export function file_permissions_to_octal(permissions: FilePermissions$): number;

export function file_info_permissions(file_info: FileInfo$): FilePermissions$;

export function set_permissions_octal(filepath: string, permissions: number): _.Result<
  undefined,
  FileError$
>;

export function set_permissions(filepath: string, permissions: FilePermissions$): _.Result<
  undefined,
  FileError$
>;

export function current_directory(): _.Result<string, FileError$>;
