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

export function new$() {
  return new DataSetBuilder(
    new None(),
    new None(),
    toList([new RootDataSet($data_set.new$())]),
    new None(),
    false,
  );
}

export function is_complete(builder) {
  return builder.is_complete;
}

export function file_preamble(builder) {
  let _pipe = builder.file_preamble;
  return $option.to_result(_pipe, undefined);
}

export function final_data_set(builder) {
  let _block;
  let $ = builder.is_complete;
  let $1 = builder.location;
  if ($1 instanceof $Empty) {
    _block = new Error(undefined);
  } else {
    let $2 = $1.tail;
    if ($2 instanceof $Empty) {
      let $3 = $1.head;
      if ($3 instanceof RootDataSet) {
        if ($) {
          let data_set = $3.data_set;
          _block = new Ok(data_set);
        } else {
          _block = new Error(undefined);
        }
      } else {
        _block = new Error(undefined);
      }
    } else {
      _block = new Error(undefined);
    }
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

function insert_data_element_at_current_location(location, tag, value) {
  let $ = $data_element_value.bytes(value);
  if (location instanceof $Empty) {
    throw makeError(
      "panic",
      FILEPATH,
      "dcmfx_p10/data_set_builder",
      416,
      "insert_data_element_at_current_location",
      "Internal error: unable to insert at current location",
      {}
    )
  } else {
    let $1 = location.head;
    if ($1 instanceof RootDataSet) {
      let $2 = location.tail;
      if ($2 instanceof $Empty) {
        let data_set = $1.data_set;
        return toList([
          (() => {
            let _pipe = data_set;
            let _pipe$1 = $data_set.insert(_pipe, tag, value);
            return new RootDataSet(_pipe$1);
          })(),
        ]);
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "dcmfx_p10/data_set_builder",
          416,
          "insert_data_element_at_current_location",
          "Internal error: unable to insert at current location",
          {}
        )
      }
    } else if ($1 instanceof SequenceItem) {
      let rest = location.tail;
      let item_data_set = $1.data_set;
      return listPrepend(
        (() => {
          let _pipe = item_data_set;
          let _pipe$1 = $data_set.insert(_pipe, tag, value);
          return new SequenceItem(_pipe$1);
        })(),
        rest,
      );
    } else if ($1 instanceof EncapsulatedPixelDataSequence) {
      if ($ instanceof Ok) {
        let rest = location.tail;
        let vr = $1.vr;
        let items = $1.items;
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
          416,
          "insert_data_element_at_current_location",
          "Internal error: unable to insert at current location",
          {}
        )
      }
    } else {
      throw makeError(
        "panic",
        FILEPATH,
        "dcmfx_p10/data_set_builder",
        416,
        "insert_data_element_at_current_location",
        "Internal error: unable to insert at current location",
        {}
      )
    }
  }
}

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

function add_token_to_sequence(builder, token) {
  let $ = builder.location;
  if ($ instanceof $Empty) {
    let token$1 = token;
    return unexpected_token_error(token$1, builder);
  } else {
    let $1 = $.head;
    if ($1 instanceof RootDataSet) {
      let $2 = $.tail;
      if ($2 instanceof $Empty) {
        if (token instanceof $p10_token.SequenceItemStart) {
          return new Ok(
            (() => {
              let _record = builder;
              return new DataSetBuilder(
                _record.file_preamble,
                _record.file_meta_information,
                listPrepend(
                  new SequenceItem($data_set.new$()),
                  builder.location,
                ),
                _record.pending_data_element,
                _record.is_complete,
              );
            })(),
          );
        } else {
          let token$1 = token;
          return unexpected_token_error(token$1, builder);
        }
      } else {
        let token$1 = token;
        return unexpected_token_error(token$1, builder);
      }
    } else if ($1 instanceof Sequence) {
      if (token instanceof $p10_token.SequenceDelimiter) {
        let sequence_location = $.tail;
        let tag = $1.tag;
        let items = $1.items;
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
          (() => {
            let _record = builder;
            return new DataSetBuilder(
              _record.file_preamble,
              _record.file_meta_information,
              new_location,
              _record.pending_data_element,
              _record.is_complete,
            );
          })(),
        );
      } else if (token instanceof $p10_token.SequenceItemStart) {
        return new Ok(
          (() => {
            let _record = builder;
            return new DataSetBuilder(
              _record.file_preamble,
              _record.file_meta_information,
              listPrepend(new SequenceItem($data_set.new$()), builder.location),
              _record.pending_data_element,
              _record.is_complete,
            );
          })(),
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
        if (!($2 instanceof Ok)) {
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
        let value = $2[0];
        let new_location = insert_data_element_at_current_location(
          sequence_location,
          $dictionary.pixel_data.tag,
          value,
        );
        return new Ok(
          (() => {
            let _record = builder;
            return new DataSetBuilder(
              _record.file_preamble,
              _record.file_meta_information,
              new_location,
              _record.pending_data_element,
              _record.is_complete,
            );
          })(),
        );
      } else {
        return unexpected_token_error(token, builder);
      }
    }
  } else if (token instanceof $p10_token.PixelDataItem) {
    let _block;
    let _record = builder;
    _block = new DataSetBuilder(
      _record.file_preamble,
      _record.file_meta_information,
      _record.location,
      new Some(
        new PendingDataElement(
          $dictionary.item.tag,
          new $value_representation.OtherByteString(),
          toList([]),
        ),
      ),
      _record.is_complete,
    );
    let _pipe = _block;
    return new Ok(_pipe);
  } else {
    return unexpected_token_error(token, builder);
  }
}

function add_token_to_data_set(builder, token) {
  if (token instanceof $p10_token.DataElementHeader) {
    let tag = token.tag;
    let vr = token.vr;
    let _block;
    let _record = builder;
    _block = new DataSetBuilder(
      _record.file_preamble,
      _record.file_meta_information,
      _record.location,
      new Some(new PendingDataElement(tag, vr, toList([]))),
      _record.is_complete,
    );
    let _pipe = _block;
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
    let _block$1;
    let _record = builder;
    _block$1 = new DataSetBuilder(
      _record.file_preamble,
      _record.file_meta_information,
      listPrepend(new_location, builder.location),
      _record.pending_data_element,
      _record.is_complete,
    );
    let _pipe = _block$1;
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
        let $2 = $1.head;
        if ($2 instanceof Sequence) {
          let $3 = $.head;
          if ($3 instanceof SequenceItem) {
            let rest = $1.tail;
            let tag = $2.tag;
            let items = $2.items;
            let item_data_set = $3.data_set;
            let new_location = listPrepend(
              new Sequence(tag, listPrepend(item_data_set, items)),
              rest,
            );
            return new Ok(
              (() => {
                let _record = builder;
                return new DataSetBuilder(
                  _record.file_preamble,
                  _record.file_meta_information,
                  new_location,
                  _record.pending_data_element,
                  _record.is_complete,
                );
              })(),
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
            (() => {
              let _record = builder;
              return new DataSetBuilder(
                _record.file_preamble,
                _record.file_meta_information,
                _record.location,
                _record.pending_data_element,
                true,
              );
            })(),
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

function add_token_to_pending_data_element(builder, token) {
  let $ = builder.pending_data_element;
  if ($ instanceof Some) {
    if (token instanceof $p10_token.DataElementValueBytes) {
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
        let _block;
        let _record = builder;
        _block = new DataSetBuilder(
          _record.file_preamble,
          _record.file_meta_information,
          new_location,
          new None(),
          _record.is_complete,
        );
        let _pipe = _block;
        return new Ok(_pipe);
      } else {
        let _block;
        let _record = builder;
        _block = new DataSetBuilder(
          _record.file_preamble,
          _record.file_meta_information,
          _record.location,
          new Some(new PendingDataElement(tag, vr, data$1)),
          _record.is_complete,
        );
        let _pipe = _block;
        return new Ok(_pipe);
      }
    } else {
      let token$1 = token;
      return unexpected_token_error(token$1, builder);
    }
  } else {
    let token$1 = token;
    return unexpected_token_error(token$1, builder);
  }
}

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
              (() => {
                let _record = builder;
                return new DataSetBuilder(
                  new Some(preamble),
                  _record.file_meta_information,
                  _record.location,
                  _record.pending_data_element,
                  _record.is_complete,
                );
              })(),
            );
          } else if (token instanceof $p10_token.FileMetaInformation) {
            let data_set = token.data_set;
            return new Ok(
              (() => {
                let _record = builder;
                return new DataSetBuilder(
                  _record.file_preamble,
                  new Some(data_set),
                  _record.location,
                  _record.pending_data_element,
                  _record.is_complete,
                );
              })(),
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

export function force_end(builder) {
  return $bool.guard(
    builder.is_complete,
    builder,
    () => {
      let _block;
      let _record = builder;
      _block = new DataSetBuilder(
        _record.file_preamble,
        _record.file_meta_information,
        _record.location,
        new None(),
        _record.is_complete,
      );
      let builder$1 = _block;
      let _block$1;
      let $ = builder$1.location;
      if ($ instanceof $Empty) {
        _block$1 = new $p10_token.End();
      } else {
        let $1 = $.head;
        if ($1 instanceof Sequence) {
          let tag = $1.tag;
          _block$1 = new $p10_token.SequenceDelimiter(tag);
        } else if ($1 instanceof SequenceItem) {
          _block$1 = new $p10_token.SequenceItemDelimiter();
        } else if ($1 instanceof EncapsulatedPixelDataSequence) {
          _block$1 = new $p10_token.SequenceDelimiter(
            $dictionary.pixel_data.tag,
          );
        } else {
          _block$1 = new $p10_token.End();
        }
      }
      let token = _block$1;
      let _block$2;
      let _pipe = builder$1;
      _block$2 = add_token(_pipe, token);
      let $1 = _block$2;
      if (!($1 instanceof Ok)) {
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
      let builder$2 = $1[0];
      return force_end(builder$2);
    },
  );
}
