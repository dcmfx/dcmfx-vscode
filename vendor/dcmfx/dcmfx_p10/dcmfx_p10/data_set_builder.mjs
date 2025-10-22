/// <reference types="./data_set_builder.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $dictionary from "../../dcmfx_core/dcmfx_core/dictionary.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $p10_error from "../dcmfx_p10/p10_error.mjs";
import * as $p10_token from "../dcmfx_p10/p10_token.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../gleam.mjs";

const FILEPATH = "src/dcmfx_p10/data_set_builder.gleam";

class DataSetBuilder extends $CustomType {
  constructor(file_preamble, file_meta_information, location, pending_data_element, is_complete) {
    super();
    this.file_preamble = file_preamble;
    this.file_meta_information = file_meta_information;
    this.location = location;
    this.pending_data_element = pending_data_element;
    this.is_complete = is_complete;
  }
}

class RootDataSet extends $CustomType {
  constructor(data_set) {
    super();
    this.data_set = data_set;
  }
}

class Sequence extends $CustomType {
  constructor(tag, items) {
    super();
    this.tag = tag;
    this.items = items;
  }
}

class SequenceItem extends $CustomType {
  constructor(data_set) {
    super();
    this.data_set = data_set;
  }
}

class EncapsulatedPixelDataSequence extends $CustomType {
  constructor(vr, items) {
    super();
    this.vr = vr;
    this.items = items;
  }
}

class PendingDataElement extends $CustomType {
  constructor(tag, vr, data) {
    super();
    this.tag = tag;
    this.vr = vr;
    this.data = data;
  }
}

/**
 * Creates a new data set builder that can be given DICOM P10 tokens to be
 * materialized into an in-memory DICOM data set.
 */
export function new$() {
  return new DataSetBuilder(
    new None(),
    new None(),
    toList([new RootDataSet($data_set.new$())]),
    new None(),
    false,
  );
}

/**
 * Returns whether the data set builder is complete, i.e. whether it has
 * received the final `p10_token.End` token signalling the end of the incoming
 * DICOM P10 tokens.
 */
export function is_complete(builder) {
  return builder.is_complete;
}

/**
 * Returns the File Preamble read by a data set builder, or an error if it has
 * not yet been read. The File Preamble is always 128 bytes in size.
 *
 * The content of these bytes are application-defined, and are often unused and
 * set to zero.
 */
export function file_preamble(builder) {
  let _pipe = builder.file_preamble;
  return $option.to_result(_pipe, undefined);
}

/**
 * Returns the final data set constructed by a data set builder from the DICOM
 * P10 tokens it has been fed, or an error if it has not yet been fully read.
 */
export function final_data_set(builder) {
  let _block;
  let $ = builder.is_complete;
  let $1 = builder.location;
  if ($) {
    if ($1 instanceof $Empty) {
      _block = new Error(undefined);
    } else {
      let $2 = $1.tail;
      if ($2 instanceof $Empty) {
        let $3 = $1.head;
        if ($3 instanceof RootDataSet) {
          let data_set = $3.data_set;
          _block = new Ok(data_set);
        } else {
          _block = new Error(undefined);
        }
      } else {
        _block = new Error(undefined);
      }
    }
  } else {
    _block = new Error(undefined);
  }
  let root_data_set = _block;
  return $result.map(
    root_data_set,
    (root_data_set) => {
      let _block$1;
      let _pipe = builder.file_meta_information;
      _block$1 = $option.unwrap(_pipe, $data_set.new$());
      let file_meta_information = _block$1;
      return $data_set.merge(root_data_set, file_meta_information);
    },
  );
}

/**
 * Inserts a new data element into the head of the given data set builder
 * location and returns an updated location.
 * 
 * @ignore
 */
function insert_data_element_at_current_location(location, tag, value) {
  let $ = $data_element_value.bytes(value);
  if (location instanceof $Empty) {
    throw makeError(
      "panic",
      FILEPATH,
      "dcmfx_p10/data_set_builder",
      412,
      "insert_data_element_at_current_location",
      "Internal error: unable to insert at current location",
      {}
    )
  } else {
    let $1 = location.tail;
    if ($1 instanceof $Empty) {
      let $2 = location.head;
      if ($2 instanceof RootDataSet) {
        let data_set = $2.data_set;
        return toList([
          (() => {
            let _pipe = data_set;
            let _pipe$1 = $data_set.insert(_pipe, tag, value);
            return new RootDataSet(_pipe$1);
          })(),
        ]);
      } else if ($2 instanceof SequenceItem) {
        let rest = $1;
        let item_data_set = $2.data_set;
        return listPrepend(
          (() => {
            let _pipe = item_data_set;
            let _pipe$1 = $data_set.insert(_pipe, tag, value);
            return new SequenceItem(_pipe$1);
          })(),
          rest,
        );
      } else if ($2 instanceof EncapsulatedPixelDataSequence && $ instanceof Ok) {
        let rest = $1;
        let vr = $2.vr;
        let items = $2.items;
        let bytes = $[0];
        return listPrepend(
          new EncapsulatedPixelDataSequence(vr, listPrepend(bytes, items)),
          rest,
        );
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "dcmfx_p10/data_set_builder",
          412,
          "insert_data_element_at_current_location",
          "Internal error: unable to insert at current location",
          {}
        )
      }
    } else {
      let $2 = location.head;
      if ($2 instanceof SequenceItem) {
        let rest = $1;
        let item_data_set = $2.data_set;
        return listPrepend(
          (() => {
            let _pipe = item_data_set;
            let _pipe$1 = $data_set.insert(_pipe, tag, value);
            return new SequenceItem(_pipe$1);
          })(),
          rest,
        );
      } else if ($2 instanceof EncapsulatedPixelDataSequence && $ instanceof Ok) {
        let rest = $1;
        let vr = $2.vr;
        let items = $2.items;
        let bytes = $[0];
        return listPrepend(
          new EncapsulatedPixelDataSequence(vr, listPrepend(bytes, items)),
          rest,
        );
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "dcmfx_p10/data_set_builder",
          412,
          "insert_data_element_at_current_location",
          "Internal error: unable to insert at current location",
          {}
        )
      }
    }
  }
}

/**
 * Takes the tag, VR, and final bytes for a new data element and returns the
 * `DataElementValue` for it to insert into the active data set.
 * 
 * @ignore
 */
function build_final_data_element_value(tag, vr, value_bytes) {
  let _block;
  let _pipe = value_bytes;
  let _pipe$1 = $list.reverse(_pipe);
  _block = $bit_array.concat(_pipe$1);
  let final_bytes = _block;
  let $ = $dictionary.is_lut_descriptor_tag(tag);
  if ($) {
    return $data_element_value.new_lookup_table_descriptor_unchecked(
      vr,
      final_bytes,
    );
  } else {
    return $data_element_value.new_binary_unchecked(vr, final_bytes);
  }
}

/**
 * Converts a data set location to a human-readable string for error reporting
 * and debugging purposes.
 * 
 * @ignore
 */
function location_to_string(loop$location, loop$acc) {
  while (true) {
    let location = loop$location;
    let acc = loop$acc;
    if (location instanceof $Empty) {
      return $string.join(acc, ".");
    } else {
      let item = location.head;
      let rest = location.tail;
      let _block;
      if (item instanceof RootDataSet) {
        _block = "RootDataSet";
      } else if (item instanceof Sequence) {
        let tag = item.tag;
        _block = "Sequence" + $data_element_tag.to_string(tag);
      } else if (item instanceof SequenceItem) {
        _block = "SequenceItem";
      } else {
        _block = "EncapsulatedPixelDataSequence";
      }
      let s = _block;
      loop$location = rest;
      loop$acc = listPrepend(s, acc);
    }
  }
}

/**
 * The error returned when an unexpected DICOM P10 token is received.
 * 
 * @ignore
 */
function unexpected_token_error(token, builder) {
  return new Error(
    new $p10_error.TokenStreamInvalid(
      "Building data set",
      "Received unexpected P10 token at location: " + location_to_string(
        builder.location,
        toList([]),
      ),
      token,
    ),
  );
}

/**
 * Ingests the next token when the data set builder's current location
 * specifies a sequence.
 * 
 * @ignore
 */
function add_token_to_sequence(builder, token) {
  let $ = builder.location;
  if ($ instanceof $Empty) {
    let token$1 = token;
    return unexpected_token_error(token$1, builder);
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      let $2 = $.head;
      if (
        $2 instanceof RootDataSet &&
        token instanceof $p10_token.SequenceItemStart
      ) {
        return new Ok(
          new DataSetBuilder(
            builder.file_preamble,
            builder.file_meta_information,
            listPrepend(new SequenceItem($data_set.new$()), builder.location),
            builder.pending_data_element,
            builder.is_complete,
          ),
        );
      } else if ($2 instanceof Sequence) {
        if (token instanceof $p10_token.SequenceDelimiter) {
          let sequence_location = $1;
          let tag = $2.tag;
          let items = $2.items;
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.reverse(_pipe);
          _block = $data_element_value.new_sequence(_pipe$1);
          let sequence = _block;
          let new_location = insert_data_element_at_current_location(
            sequence_location,
            tag,
            sequence,
          );
          return new Ok(
            new DataSetBuilder(
              builder.file_preamble,
              builder.file_meta_information,
              new_location,
              builder.pending_data_element,
              builder.is_complete,
            ),
          );
        } else if (token instanceof $p10_token.SequenceItemStart) {
          return new Ok(
            new DataSetBuilder(
              builder.file_preamble,
              builder.file_meta_information,
              listPrepend(new SequenceItem($data_set.new$()), builder.location),
              builder.pending_data_element,
              builder.is_complete,
            ),
          );
        } else {
          let token$1 = token;
          return unexpected_token_error(token$1, builder);
        }
      } else {
        let token$1 = token;
        return unexpected_token_error(token$1, builder);
      }
    } else {
      let $2 = $.head;
      if ($2 instanceof Sequence) {
        if (token instanceof $p10_token.SequenceDelimiter) {
          let sequence_location = $1;
          let tag = $2.tag;
          let items = $2.items;
          let _block;
          let _pipe = items;
          let _pipe$1 = $list.reverse(_pipe);
          _block = $data_element_value.new_sequence(_pipe$1);
          let sequence = _block;
          let new_location = insert_data_element_at_current_location(
            sequence_location,
            tag,
            sequence,
          );
          return new Ok(
            new DataSetBuilder(
              builder.file_preamble,
              builder.file_meta_information,
              new_location,
              builder.pending_data_element,
              builder.is_complete,
            ),
          );
        } else if (token instanceof $p10_token.SequenceItemStart) {
          return new Ok(
            new DataSetBuilder(
              builder.file_preamble,
              builder.file_meta_information,
              listPrepend(new SequenceItem($data_set.new$()), builder.location),
              builder.pending_data_element,
              builder.is_complete,
            ),
          );
        } else {
          let token$1 = token;
          return unexpected_token_error(token$1, builder);
        }
      } else {
        let token$1 = token;
        return unexpected_token_error(token$1, builder);
      }
    }
  }
}

/**
 * Ingests the next token when the data set builder's current location
 * specifies an encapsulated pixel data sequence.
 * 
 * @ignore
 */
function add_token_to_encapsulated_pixel_data_sequence(builder, token) {
  let $ = builder.location;
  if (token instanceof $p10_token.SequenceDelimiter) {
    if ($ instanceof $Empty) {
      return unexpected_token_error(token, builder);
    } else {
      let $1 = $.head;
      if ($1 instanceof EncapsulatedPixelDataSequence) {
        let sequence_location = $.tail;
        let vr = $1.vr;
        let items = $1.items;
        let _block;
        let _pipe = items;
        let _pipe$1 = $list.reverse(_pipe);
        _block = ((_capture) => {
          return $data_element_value.new_encapsulated_pixel_data(vr, _capture);
        })(_pipe$1);
        let $2 = _block;
        let value;
        if ($2 instanceof Ok) {
          value = $2[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "dcmfx_p10/data_set_builder",
            244,
            "add_token_to_encapsulated_pixel_data_sequence",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $2,
              start: 7793,
              end: 7918,
              pattern_start: 7804,
              pattern_end: 7813
            }
          )
        }
        let new_location = insert_data_element_at_current_location(
          sequence_location,
          $dictionary.pixel_data.tag,
          value,
        );
        return new Ok(
          new DataSetBuilder(
            builder.file_preamble,
            builder.file_meta_information,
            new_location,
            builder.pending_data_element,
            builder.is_complete,
          ),
        );
      } else {
        return unexpected_token_error(token, builder);
      }
    }
  } else if (token instanceof $p10_token.PixelDataItem) {
    let _pipe = new DataSetBuilder(
      builder.file_preamble,
      builder.file_meta_information,
      builder.location,
      new Some(
        new PendingDataElement(
          $dictionary.item.tag,
          new $value_representation.OtherByteString(),
          toList([]),
        ),
      ),
      builder.is_complete,
    );
    return new Ok(_pipe);
  } else {
    return unexpected_token_error(token, builder);
  }
}

/**
 * Ingests the next token when the data set builder's current location is in
 * either the root data set or in an item that's part of a sequence.
 * 
 * @ignore
 */
function add_token_to_data_set(builder, token) {
  if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let _pipe = new DataSetBuilder(
      builder.file_preamble,
      builder.file_meta_information,
      builder.location,
      new Some(new PendingDataElement(tag, vr, toList([]))),
      builder.is_complete,
    );
    return new Ok(_pipe);
  } else if (token instanceof $p10_token.SequenceStart) {
    let tag = token.tag;
    let vr = token.vr;
    let _block;
    if (vr instanceof $value_representation.OtherByteString) {
      _block = new EncapsulatedPixelDataSequence(vr, toList([]));
    } else if (vr instanceof $value_representation.OtherWordString) {
      _block = new EncapsulatedPixelDataSequence(vr, toList([]));
    } else {
      _block = new Sequence(tag, toList([]));
    }
    let new_location = _block;
    let _pipe = new DataSetBuilder(
      builder.file_preamble,
      builder.file_meta_information,
      listPrepend(new_location, builder.location),
      builder.pending_data_element,
      builder.is_complete,
    );
    return new Ok(_pipe);
  } else if (token instanceof $p10_token.SequenceItemDelimiter) {
    let $ = builder.location;
    if ($ instanceof $Empty) {
      return new Error(
        new $p10_error.TokenStreamInvalid(
          "Building data set",
          "Received sequence item delimiter token outside of an item",
          token,
        ),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(
          new $p10_error.TokenStreamInvalid(
            "Building data set",
            "Received sequence item delimiter token outside of an item",
            token,
          ),
        );
      } else {
        let $2 = $.head;
        if ($2 instanceof SequenceItem) {
          let $3 = $1.head;
          if ($3 instanceof Sequence) {
            let rest = $1.tail;
            let item_data_set = $2.data_set;
            let tag = $3.tag;
            let items = $3.items;
            let new_location = listPrepend(
              new Sequence(tag, listPrepend(item_data_set, items)),
              rest,
            );
            return new Ok(
              new DataSetBuilder(
                builder.file_preamble,
                builder.file_meta_information,
                new_location,
                builder.pending_data_element,
                builder.is_complete,
              ),
            );
          } else {
            return new Error(
              new $p10_error.TokenStreamInvalid(
                "Building data set",
                "Received sequence item delimiter token outside of an item",
                token,
              ),
            );
          }
        } else {
          return new Error(
            new $p10_error.TokenStreamInvalid(
              "Building data set",
              "Received sequence item delimiter token outside of an item",
              token,
            ),
          );
        }
      }
    }
  } else if (token instanceof $p10_token.End) {
    let $ = builder.location;
    if ($ instanceof $Empty) {
      return new Error(
        new $p10_error.TokenStreamInvalid(
          "Building data set",
          "Received end token outside of the root data set",
          token,
        ),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof RootDataSet) {
          return new Ok(
            new DataSetBuilder(
              builder.file_preamble,
              builder.file_meta_information,
              builder.location,
              builder.pending_data_element,
              true,
            ),
          );
        } else {
          return new Error(
            new $p10_error.TokenStreamInvalid(
              "Building data set",
              "Received end token outside of the root data set",
              token,
            ),
          );
        }
      } else {
        return new Error(
          new $p10_error.TokenStreamInvalid(
            "Building data set",
            "Received end token outside of the root data set",
            token,
          ),
        );
      }
    }
  } else {
    let token$1 = token;
    return unexpected_token_error(token$1, builder);
  }
}

/**
 * Ingests the next token when the data set builder has a pending data element
 * that is expecting value bytes tokens containing its data.
 * 
 * @ignore
 */
function add_token_to_pending_data_element(builder, token) {
  let $ = builder.pending_data_element;
  if ($ instanceof Some && token instanceof $p10_token.DataElementValueBytes) {
    let pending_data_element = $[0];
    let data = token.data;
    let bytes_remaining = token.bytes_remaining;
    let tag = pending_data_element.tag;
    let vr = pending_data_element.vr;
    let data$1 = listPrepend(data, pending_data_element.data);
    if (bytes_remaining === 0) {
      let value = build_final_data_element_value(tag, vr, data$1);
      let new_location = insert_data_element_at_current_location(
        builder.location,
        tag,
        value,
      );
      let _pipe = new DataSetBuilder(
        builder.file_preamble,
        builder.file_meta_information,
        new_location,
        new None(),
        builder.is_complete,
      );
      return new Ok(_pipe);
    } else {
      let _pipe = new DataSetBuilder(
        builder.file_preamble,
        builder.file_meta_information,
        builder.location,
        new Some(new PendingDataElement(tag, vr, data$1)),
        builder.is_complete,
      );
      return new Ok(_pipe);
    }
  } else {
    let token$1 = token;
    return unexpected_token_error(token$1, builder);
  }
}

/**
 * Adds new DICOM P10 token to a data set builder. This function is responsible
 * for progressively constructing a data set from the tokens received, and also
 * checks that the tokens being received are in a valid order.
 */
export function add_token(builder, token) {
  return $bool.guard(
    builder.is_complete,
    new Error(
      new $p10_error.TokenStreamInvalid(
        "Building data set",
        "Token received after the token stream has ended",
        token,
      ),
    ),
    () => {
      return $bool.lazy_guard(
        !isEqual(builder.pending_data_element, new None()),
        () => { return add_token_to_pending_data_element(builder, token); },
        () => {
          let $ = builder.location;
          if (token instanceof $p10_token.FilePreambleAndDICMPrefix) {
            let preamble = token.preamble;
            return new Ok(
              new DataSetBuilder(
                new Some(preamble),
                builder.file_meta_information,
                builder.location,
                builder.pending_data_element,
                builder.is_complete,
              ),
            );
          } else if (token instanceof $p10_token.FileMetaInformation) {
            let data_set = token.data_set;
            return new Ok(
              new DataSetBuilder(
                builder.file_preamble,
                new Some(data_set),
                builder.location,
                builder.pending_data_element,
                builder.is_complete,
              ),
            );
          } else if ($ instanceof $Empty) {
            return add_token_to_data_set(builder, token);
          } else {
            let $1 = $.head;
            if ($1 instanceof Sequence) {
              return add_token_to_sequence(builder, token);
            } else if ($1 instanceof EncapsulatedPixelDataSequence) {
              return add_token_to_encapsulated_pixel_data_sequence(
                builder,
                token,
              );
            } else {
              return add_token_to_data_set(builder, token);
            }
          }
        },
      );
    },
  );
}

/**
 * Takes a data set builder that isn't yet complete, e.g. because an error was
 * encountered reading the source of the P10 tokens it was being built from,
 * and adds the necessary delimiter and end tokens so that it is considered
 * complete and can have its final data set read out.
 *
 * This allows a partially built data set to be retrieved in its current state.
 * This should never be needed when reading or constructing valid and complete
 * DICOM P10 data.
 */
export function force_end(builder) {
  return $bool.guard(
    builder.is_complete,
    builder,
    () => {
      let builder$1 = new DataSetBuilder(
        builder.file_preamble,
        builder.file_meta_information,
        builder.location,
        new None(),
        builder.is_complete,
      );
      let _block;
      let $ = builder$1.location;
      if ($ instanceof $Empty) {
        _block = new $p10_token.End();
      } else {
        let $1 = $.head;
        if ($1 instanceof Sequence) {
          let tag = $1.tag;
          _block = new $p10_token.SequenceDelimiter(tag);
        } else if ($1 instanceof SequenceItem) {
          _block = new $p10_token.SequenceItemDelimiter();
        } else if ($1 instanceof EncapsulatedPixelDataSequence) {
          _block = new $p10_token.SequenceDelimiter($dictionary.pixel_data.tag);
        } else {
          _block = new $p10_token.End();
        }
      }
      let token = _block;
      let _block$1;
      let _pipe = builder$1;
      _block$1 = add_token(_pipe, token);
      let $1 = _block$1;
      let builder$2;
      if ($1 instanceof Ok) {
        builder$2 = $1[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "dcmfx_p10/data_set_builder",
          130,
          "force_end",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 4355,
            end: 4407,
            pattern_start: 4366,
            pattern_end: 4377
          }
        )
      }
      return force_end(builder$2);
    },
  );
}
