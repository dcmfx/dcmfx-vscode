/// <reference types="./dcmfx_p10.d.mts" />
import * as $data_element_tag from "../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $file_stream from "../file_streams/file_streams/file_stream.mjs";
import * as $file_stream_error from "../file_streams/file_streams/file_stream_error.mjs";
import * as $bit_array from "../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $order from "../gleam_stdlib/gleam/order.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $data_set_builder from "./dcmfx_p10/data_set_builder.mjs";
import * as $p10_error from "./dcmfx_p10/p10_error.mjs";
import * as $p10_read from "./dcmfx_p10/p10_read.mjs";
import * as $p10_read_config from "./dcmfx_p10/p10_read_config.mjs";
import * as $p10_token from "./dcmfx_p10/p10_token.mjs";
import * as $p10_write from "./dcmfx_p10/p10_write.mjs";
import * as $p10_write_config from "./dcmfx_p10/p10_write_config.mjs";
import * as $p10_filter_transform from "./dcmfx_p10/transforms/p10_filter_transform.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  makeError,
  isEqual,
  toBitArray,
} from "./gleam.mjs";

const FILEPATH = "src/dcmfx_p10.gleam";

/**
 * Returns whether the given bytes contain DICOM P10 data by checking for the
 * presence of the 'DICM' prefix at offset 128.
 */
export function is_valid_bytes(bytes) {
  if (
    bytes.bitSize >= 1024 &&
    bytes.bitSize >= 1056 &&
    bytes.byteAt(128) === 68 &&
      bytes.byteAt(129) === 73 &&
      bytes.byteAt(130) === 67 &&
      bytes.byteAt(131) === 77 &&
    (bytes.bitSize - 1056) % 8 === 0
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Returns whether a file contains DICOM P10 data by checking for the presence
 * of the 'DICM' prefix at offset 128.
 */
export function is_valid_file(filename) {
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_read(_pipe);
  let _pipe$2 = $result.map(
    _pipe$1,
    (stream) => {
      let bytes = $file_stream.read_bytes_exact(stream, 132);
      let $ = $file_stream.close(stream);
      
      if (bytes instanceof Ok) {
        let bytes$1 = bytes[0];
        return is_valid_bytes(bytes$1);
      } else {
        return false;
      }
    },
  );
  return $result.unwrap(_pipe$2, false);
}

/**
 * Reads the next DICOM P10 tokens from a read stream. This repeatedly reads
 * bytes from the read stream in 256 KiB chunks until at least one DICOM P10
 * token is made available by the read context or an error occurs.
 */
export function read_tokens_from_stream(
  loop$stream,
  loop$context,
  loop$chunk_size
) {
  while (true) {
    let stream = loop$stream;
    let context = loop$context;
    let chunk_size = loop$chunk_size;
    let $ = $p10_read.read_tokens(context);
    if ($ instanceof Ok) {
      let $1 = $[0][0];
      if ($1 instanceof $Empty) {
        let context$1 = $[0][1];
        loop$stream = stream;
        loop$context = context$1;
        loop$chunk_size = chunk_size;
      } else {
        return $;
      }
    } else {
      let $1 = $[0];
      if ($1 instanceof $p10_error.DataRequired) {
        let $2 = $file_stream.read_bytes(
          stream,
          $option.unwrap(chunk_size, 256 * 1024),
        );
        if ($2 instanceof Ok) {
          let data = $2[0];
          let $3 = $p10_read.write_bytes(context, data, false);
          if ($3 instanceof Ok) {
            let context$1 = $3[0];
            loop$stream = stream;
            loop$context = context$1;
            loop$chunk_size = chunk_size;
          } else {
            return $3;
          }
        } else {
          let $3 = $2[0];
          if ($3 instanceof $file_stream_error.Eof) {
            let $4 = $p10_read.write_bytes(context, toBitArray([]), true);
            if ($4 instanceof Ok) {
              let context$1 = $4[0];
              loop$stream = stream;
              loop$context = context$1;
              loop$chunk_size = chunk_size;
            } else {
              return $4;
            }
          } else {
            let e = $3;
            return new Error(
              new $p10_error.FileStreamError("Reading from file stream", e),
            );
          }
        }
      } else {
        return $;
      }
    }
  }
}

function do_read_stream(loop$stream, loop$context, loop$builder) {
  while (true) {
    let stream = loop$stream;
    let context = loop$context;
    let builder = loop$builder;
    let _block;
    let _pipe = read_tokens_from_stream(stream, context, new None());
    _block = $result.map_error(_pipe, (e) => { return [e, builder]; });
    let tokens_and_context = _block;
    if (tokens_and_context instanceof Ok) {
      let tokens = tokens_and_context[0][0];
      let context$1 = tokens_and_context[0][1];
      let _block$1;
      let _pipe$1 = tokens;
      _block$1 = $list.try_fold(
        _pipe$1,
        builder,
        (builder, token) => {
          let _pipe$2 = $data_set_builder.add_token(builder, token);
          return $result.map_error(_pipe$2, (e) => { return [e, builder]; });
        },
      );
      let builder$1 = _block$1;
      if (builder$1 instanceof Ok) {
        let builder$2 = builder$1[0];
        let $ = $data_set_builder.final_data_set(builder$2);
        if ($ instanceof Ok) {
          return $;
        } else {
          loop$stream = stream;
          loop$context = context$1;
          loop$builder = builder$2;
        }
      } else {
        return builder$1;
      }
    } else {
      return tokens_and_context;
    }
  }
}

/**
 * Reads DICOM P10 data from a file read stream into an in-memory data set.
 * This will attempt to consume all data available in the read stream.
 */
export function read_stream(stream) {
  let context = $p10_read.new_read_context(new None());
  let builder = $data_set_builder.new$();
  return do_read_stream(stream, context, builder);
}

/**
 * Reads DICOM P10 data from a file into an in-memory data set. In the case of
 * an error occurring during the read both the error and the data set builder
 * at the time of the error are returned.
 *
 * This allows for the data that was successfully read prior to the error to be
 * converted into a partially-complete data set.
 */
export function read_file_returning_builder_on_error(filename) {
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_read(_pipe);
  let _pipe$2 = $result.map_error(
    _pipe$1,
    (e) => {
      return [
        new $p10_error.FileStreamError("Opening file", e),
        $data_set_builder.new$(),
      ];
    },
  );
  return $result.try$(_pipe$2, read_stream);
}

/**
 * Reads DICOM P10 data from a file into an in-memory data set.
 */
export function read_file(filename) {
  let _pipe = filename;
  let _pipe$1 = read_file_returning_builder_on_error(_pipe);
  return $result.map_error(_pipe$1, (e) => { return e[0]; });
}

function do_read_bytes(loop$context, loop$builder) {
  while (true) {
    let context = loop$context;
    let builder = loop$builder;
    let $ = $p10_read.read_tokens(context);
    if ($ instanceof Ok) {
      let tokens = $[0][0];
      let context$1 = $[0][1];
      let _block;
      let _pipe = tokens;
      _block = $list.try_fold(
        _pipe,
        builder,
        (builder, token) => {
          return $data_set_builder.add_token(builder, token);
        },
      );
      let new_builder = _block;
      if (new_builder instanceof Ok) {
        let builder$1 = new_builder[0];
        let $1 = $data_set_builder.final_data_set(builder$1);
        if ($1 instanceof Ok) {
          return $1;
        } else {
          loop$context = context$1;
          loop$builder = builder$1;
        }
      } else {
        let e = new_builder[0];
        return new Error([e, builder]);
      }
    } else {
      let e = $[0];
      return new Error([e, builder]);
    }
  }
}

/**
 * Reads DICOM P10 data from a `BitArray` into an in-memory data set.
 */
export function read_bytes(bytes) {
  let _block;
  let _pipe = $p10_read.new_read_context(new None());
  _block = $p10_read.write_bytes(_pipe, bytes, true);
  let $ = _block;
  let context;
  if ($ instanceof Ok) {
    context = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dcmfx_p10",
      171,
      "read_bytes",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 5483,
        end: 5584,
        pattern_start: 5494,
        pattern_end: 5505
      }
    )
  }
  let builder = $data_set_builder.new$();
  return do_read_bytes(context, builder);
}

function read_stream_partial_loop(
  loop$stream,
  loop$context,
  loop$filter,
  loop$builder,
  loop$largest_tag,
  loop$chunk_size
) {
  while (true) {
    let stream = loop$stream;
    let context = loop$context;
    let filter = loop$filter;
    let builder = loop$builder;
    let largest_tag = loop$largest_tag;
    let chunk_size = loop$chunk_size;
    let $ = read_tokens_from_stream(stream, context, chunk_size);
    if ($ instanceof Ok) {
      let tokens = $[0][0];
      let context$1 = $[0][1];
      let fold_result = $list.fold_until(
        tokens,
        new Ok([context$1, filter, builder, false]),
        (acc, token) => {
          let context$2;
          let filter$1;
          let builder$1;
          if (acc instanceof Ok) {
            context$2 = acc[0][0];
            filter$1 = acc[0][1];
            builder$1 = acc[0][2];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "dcmfx_p10",
              285,
              "read_stream_partial_loop",
              "Pattern match failed, no pattern matched the value.",
              {
                value: acc,
                start: 8900,
                end: 8951,
                pattern_start: 8911,
                pattern_end: 8945
              }
            )
          }
          let $1 = $p10_filter_transform.add_token(filter$1, token);
          if ($1 instanceof Ok) {
            let filtered = $1[0][0];
            let filter$2 = $1[0][1];
            let _block;
            if (filtered) {
              _block = $data_set_builder.add_token(builder$1, token);
            } else {
              _block = new Ok(builder$1);
            }
            let builder$2 = _block;
            if (builder$2 instanceof Ok) {
              let builder$3 = builder$2[0];
              if (token instanceof $p10_token.DataElementHeader) {
                let tag = token.tag;
                let path = token.path;
                let $2 = (isEqual(
                  $data_element_tag.compare(tag, largest_tag),
                  new $order.Gt()
                )) && $data_set_path.is_root(path);
                if ($2) {
                  return new $list.Stop(
                    new Ok([context$2, filter$2, builder$3, true]),
                  );
                } else {
                  return new $list.Continue(
                    new Ok([context$2, filter$2, builder$3, false]),
                  );
                }
              } else if (token instanceof $p10_token.SequenceStart) {
                let tag = token.tag;
                let path = token.path;
                let $2 = (isEqual(
                  $data_element_tag.compare(tag, largest_tag),
                  new $order.Gt()
                )) && $data_set_path.is_root(path);
                if ($2) {
                  return new $list.Stop(
                    new Ok([context$2, filter$2, builder$3, true]),
                  );
                } else {
                  return new $list.Continue(
                    new Ok([context$2, filter$2, builder$3, false]),
                  );
                }
              } else if (token instanceof $p10_token.End) {
                return new $list.Stop(
                  new Ok([context$2, filter$2, builder$3, true]),
                );
              } else {
                return new $list.Continue(
                  new Ok([context$2, filter$2, builder$3, false]),
                );
              }
            } else {
              let e = builder$2[0];
              return new $list.Stop(new Error(e));
            }
          } else {
            let e = $1[0];
            return new $list.Stop(new Error(e));
          }
        },
      );
      if (fold_result instanceof Ok) {
        let context$2 = fold_result[0][0];
        let filter$1 = fold_result[0][1];
        let builder$1 = fold_result[0][2];
        let done = fold_result[0][3];
        if (done) {
          return new Ok(builder$1);
        } else {
          loop$stream = stream;
          loop$context = context$2;
          loop$filter = filter$1;
          loop$builder = builder$1;
          loop$largest_tag = largest_tag;
          loop$chunk_size = new None();
        }
      } else {
        return fold_result;
      }
    } else {
      return $;
    }
  }
}

/**
 * Reads DICOM P10 data from a stream into an in-memory data set. Only the
 * specified data elements at the root of the main data set are read, if
 * present. The stream will only be read up to the point required to return the
 * requested data elements.
 */
export function read_stream_partial(stream, tags, config) {
  let context = $p10_read.new_read_context(config);
  let _block;
  let _pipe = tags;
  let _pipe$1 = $list.max(_pipe, $data_element_tag.compare);
  _block = $result.unwrap(_pipe$1, $data_element_tag.zero);
  let largest_tag = _block;
  let filter = $p10_filter_transform.new$(
    (tag, _, _1, path) => {
      return !$data_set_path.is_root(path) || $list.contains(tags, tag);
    },
  );
  return $result.try$(
    read_stream_partial_loop(
      stream,
      context,
      filter,
      $data_set_builder.new$(),
      largest_tag,
      new Some(8 * 1024),
    ),
    (builder) => {
      let _block$1;
      let _pipe$2 = builder;
      let _pipe$3 = $data_set_builder.force_end(_pipe$2);
      _block$1 = $data_set_builder.final_data_set(_pipe$3);
      let $ = _block$1;
      let data_set;
      if ($ instanceof Ok) {
        data_set = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10",
          260,
          "read_stream_partial",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 8123,
            end: 8225,
            pattern_start: 8134,
            pattern_end: 8146
          }
        )
      }
      let data_set$1 = $data_set.filter(
        data_set,
        (tag, _) => { return $list.contains(tags, tag); },
      );
      return new Ok(data_set$1);
    },
  );
}

/**
 * Reads DICOM P10 data from a file into an in-memory data set. Only the
 * specified data elements at the root of the main data set are read, if
 * present. The file will only be read up to the point required to return the
 * requested data elements.
 */
export function read_file_partial(filename, tags, config) {
  let $ = $file_stream.open_read(filename);
  if ($ instanceof Ok) {
    let stream = $[0];
    return read_stream_partial(stream, tags, config);
  } else {
    let e = $[0];
    return new Error(new $p10_error.FileStreamError("Opening file", e));
  }
}

/**
 * Writes a data set as DICOM P10 bytes directly to a file stream.
 */
export function write_stream(stream, data_set, config) {
  let bytes_callback = (_, p10_bytes) => {
    let _pipe = stream;
    let _pipe$1 = $file_stream.write_bytes(_pipe, p10_bytes);
    return $result.map_error(
      _pipe$1,
      (e) => {
        return new $p10_error.FileStreamError(
          "Writing DICOM P10 data to stream",
          e,
        );
      },
    );
  };
  return $p10_write.data_set_to_bytes(
    data_set,
    $data_set_path.new$(),
    undefined,
    bytes_callback,
    config,
  );
}

/**
 * Writes a data set to a DICOM P10 file. This will overwrite any existing file
 * with the given name.
 */
export function write_file(filename, data_set, config) {
  let _block;
  let _pipe = filename;
  let _pipe$1 = $file_stream.open_write(_pipe);
  _block = $result.map_error(
    _pipe$1,
    (e) => { return new $p10_error.FileStreamError("Creating write stream", e); },
  );
  let stream = _block;
  return $result.try$(
    stream,
    (stream) => {
      let write_result = write_stream(stream, data_set, config);
      let $ = $file_stream.close(stream);
      
      return write_result;
    },
  );
}

/**
 * Writes a data set to in-memory DICOM P10 bytes.
 */
export function write_bytes(data_set, config) {
  let _pipe = $p10_write.data_set_to_bytes(
    data_set,
    $data_set_path.new$(),
    toList([]),
    (chunks, bytes) => { return new Ok(listPrepend(bytes, chunks)); },
    config,
  );
  return $result.map(
    _pipe,
    (chunks) => {
      let _pipe$1 = chunks;
      let _pipe$2 = $list.reverse(_pipe$1);
      return $bit_array.concat(_pipe$2);
    },
  );
}

/**
 * Writes the specified DICOM P10 tokens to an output stream using the given
 * write context. Returns whether a `p10_token.End` token was present in the
 * tokens.
 */
export function write_tokens_to_stream(tokens, stream, context) {
  return $result.try$(
    $list.try_fold(
      tokens,
      context,
      (context, token) => { return $p10_write.write_token(context, token); },
    ),
    (context) => {
      let $ = $p10_write.read_bytes(context);
      let p10_bytes;
      let context$1;
      p10_bytes = $[0];
      context$1 = $[1];
      return $result.try$(
        $list.try_fold(
          p10_bytes,
          undefined,
          (_, bytes) => {
            let _pipe = $file_stream.write_bytes(stream, bytes);
            return $result.map_error(
              _pipe,
              (e) => {
                return new $p10_error.FileStreamError("Writing to stdout", e);
              },
            );
          },
        ),
        (_) => {
          let $1 = $list.last(tokens);
          if ($1 instanceof Ok) {
            let $2 = $1[0];
            if ($2 instanceof $p10_token.End) {
              let _pipe = $file_stream.sync(stream);
              let _pipe$1 = $result.map_error(
                _pipe,
                (e) => {
                  return new $p10_error.FileStreamError("Writing to stdout", e);
                },
              );
              return $result.replace(_pipe$1, [true, context$1]);
            } else {
              return new Ok([false, context$1]);
            }
          } else {
            return new Ok([false, context$1]);
          }
        },
      );
    },
  );
}
