import type * as $set from "../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "./gleam.d.mts";

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

export class NotUtf8 extends _.CustomType {}

export class Unknown extends _.CustomType {
  constructor(inner: string);
  
  inner: string;
}

export type FileError$ = Eacces | Eagain | Ebadf | Ebadmsg | Ebusy | Edeadlk | Edeadlock | Edquot | Eexist | Efault | Efbig | Eftype | Eintr | Einval | Eio | Eisdir | Eloop | Emfile | Emlink | Emultihop | Enametoolong | Enfile | Enobufs | Enodev | Enolck | Enolink | Enoent | Enomem | Enospc | Enosr | Enostr | Enosys | Enotblk | Enotdir | Enotsup | Enxio | Eopnotsupp | Eoverflow | Eperm | Epipe | Erange | Erofs | Espipe | Esrch | Estale | Etxtbsy | Exdev | NotUtf8 | Unknown;

export class FileInfo extends _.CustomType {
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

export class File extends _.CustomType {}

export class Directory extends _.CustomType {}

export class Symlink extends _.CustomType {}

export class Other extends _.CustomType {}

export type FileType$ = File | Directory | Symlink | Other;

export class Read extends _.CustomType {}

export class Write extends _.CustomType {}

export class Execute extends _.CustomType {}

export type Permission$ = Read | Write | Execute;

export class FilePermissions extends _.CustomType {
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
