/// <reference types="./data_set_builder.d.mts" />
import * as $data_element_tag from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import { DataElementTag } from "../../dcmfx_core/dcmfx_core/data_element_tag.mjs";
import * as $data_element_value from "../../dcmfx_core/dcmfx_core/data_element_value.mjs";
import * as $data_set from "../../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $registry from "../../dcmfx_core/dcmfx_core/registry.mjs";
import * as $value_representation from "../../dcmfx_core/dcmfx_core/value_representation.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../../gleam_stdlib/gleam/bool.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $data_element_header from "../dcmfx_p10/internal/data_element_header.mjs";
import { DataElementHeader } from "../dcmfx_p10/internal/data_element_header.mjs";
import * as $p10_error from "../dcmfx_p10/p10_error.mjs";
import * as $p10_part from "../dcmfx_p10/p10_part.mjs";
import {
  Ok,
  Error,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  isEqual,
} from "../gleam.mjs";

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
  let root_data_set = (() => {
    let $ = builder.is_complete;
    let $1 = builder.location;
    if ($ && $1.hasLength(1) && $1.head instanceof RootDataSet) {
      let data_set = $1.head.data_set;
      return new Ok(data_set);
    } else {
      return new Error(undefined);
    }
  })();
  return $result.map(
    root_data_set,
    (root_data_set) => {
      let file_meta_information = (() => {
        let _pipe = builder.file_meta_information;
        return $option.unwrap(_pipe, $data_set.new$());
      })();
      return $data_set.merge(root_data_set, file_meta_information);
    },
  );
}

function insert_data_element_at_current_location(location, tag, value) {
  let $ = $data_element_value.bytes(value);
  if (location.hasLength(1) && location.head instanceof RootDataSet) {
    let data_set = location.head.data_set;
    return toList([
      (() => {
        let _pipe = data_set;
        let _pipe$1 = $data_set.insert(_pipe, tag, value);
        return new RootDataSet(_pipe$1);
      })(),
    ]);
  } else if (location.atLeastLength(1) && location.head instanceof SequenceItem) {
    let item_data_set = location.head.data_set;
    let rest = location.tail;
    return listPrepend(
      (() => {
        let _pipe = item_data_set;
        let _pipe$1 = $data_set.insert(_pipe, tag, value);
        return new SequenceItem(_pipe$1);
      })(),
      rest,
    );
  } else if (location.atLeastLength(1) &&
  location.head instanceof EncapsulatedPixelDataSequence &&
  $.isOk()) {
    let vr = location.head.vr;
    let items = location.head.items;
    let rest = location.tail;
    let bytes = $[0];
    return listPrepend(
      new EncapsulatedPixelDataSequence(vr, listPrepend(bytes, items)),
      rest,
    );
  } else {
    throw makeError(
      "panic",
      "dcmfx_p10/data_set_builder",
      408,
      "insert_data_element_at_current_location",
      "Internal error: unable to insert at current location",
      {}
    )
  }
}

function build_final_data_element_value(tag, vr, value_bytes) {
  let final_bytes = (() => {
    let _pipe = value_bytes;
    let _pipe$1 = $list.reverse(_pipe);
    return $bit_array.concat(_pipe$1);
  })();
  let $ = $registry.is_lut_descriptor_tag(tag);
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
    if (location.hasLength(0)) {
      return $string.join(acc, ".");
    } else {
      let item = location.head;
      let rest = location.tail;
      let s = (() => {
        if (item instanceof RootDataSet) {
          return "RootDataSet";
        } else if (item instanceof Sequence) {
          let tag = item.tag;
          return "Sequence" + $data_element_tag.to_string(tag);
        } else if (item instanceof SequenceItem) {
          return "SequenceItem";
        } else {
          return "EncapsulatedPixelDataSequence";
        }
      })();
      loop$location = rest;
      loop$acc = listPrepend(s, acc);
    }
  }
}

function unexpected_part_error(part, builder) {
  return new Error(
    new $p10_error.PartStreamInvalid(
      "Building data set",
      "Received unexpected P10 part at location: " + location_to_string(
        builder.location,
        toList([]),
      ),
      part,
    ),
  );
}

function add_part_in_sequence(builder, part) {
  let $ = builder.location;
  if (part instanceof $p10_part.SequenceItemStart &&
  $.hasLength(1) &&
  $.head instanceof RootDataSet) {
    return new Ok(
      builder.withFields({
        location: listPrepend(
          new SequenceItem($data_set.new$()),
          builder.location,
        )
      }),
    );
  } else if (part instanceof $p10_part.SequenceItemStart &&
  $.atLeastLength(1) &&
  $.head instanceof Sequence) {
    return new Ok(
      builder.withFields({
        location: listPrepend(
          new SequenceItem($data_set.new$()),
          builder.location,
        )
      }),
    );
  } else if (part instanceof $p10_part.SequenceDelimiter &&
  $.atLeastLength(1) &&
  $.head instanceof Sequence) {
    let tag = $.head.tag;
    let items = $.head.items;
    let sequence_location = $.tail;
    let value = (() => {
      let _pipe = items;
      let _pipe$1 = $list.reverse(_pipe);
      return $data_element_value.new_sequence(_pipe$1);
    })();
    let new_location = insert_data_element_at_current_location(
      sequence_location,
      tag,
      value,
    );
    return new Ok(builder.withFields({ location: new_location }));
  } else {
    let part$1 = part;
    return unexpected_part_error(part$1, builder);
  }
}

function add_part_in_encapsulated_pixel_data_sequence(builder, part) {
  let $ = builder.location;
  if (part instanceof $p10_part.PixelDataItem) {
    let _pipe = builder.withFields({
      pending_data_element: new Some(
        new PendingDataElement(
          $registry.item.tag,
          new $value_representation.OtherByteString(),
          toList([]),
        ),
      )
    });
    return new Ok(_pipe);
  } else if (part instanceof $p10_part.SequenceDelimiter &&
  $.atLeastLength(1) &&
  $.head instanceof EncapsulatedPixelDataSequence) {
    let vr = $.head.vr;
    let items = $.head.items;
    let sequence_location = $.tail;
    let $1 = (() => {
      let _pipe = items;
      let _pipe$1 = $list.reverse(_pipe);
      return ((_capture) => {
        return $data_element_value.new_encapsulated_pixel_data(vr, _capture);
      })(_pipe$1);
    })();
    if (!$1.isOk()) {
      throw makeError(
        "let_assert",
        "dcmfx_p10/data_set_builder",
        240,
        "add_part_in_encapsulated_pixel_data_sequence",
        "Pattern match failed, no pattern matched the value.",
        { value: $1 }
      )
    }
    let value = $1[0];
    let new_location = insert_data_element_at_current_location(
      sequence_location,
      $registry.pixel_data.tag,
      value,
    );
    return new Ok(builder.withFields({ location: new_location }));
  } else {
    return unexpected_part_error(part, builder);
  }
}

function add_part_in_data_set(builder, part) {
  if (part instanceof $p10_part.DataElementHeader) {
    let tag = part.tag;
    let vr = part.vr;
    let _pipe = builder.withFields({
      pending_data_element: new Some(
        new PendingDataElement(tag, vr, toList([])),
      )
    });
    return new Ok(_pipe);
  } else if (part instanceof $p10_part.SequenceStart) {
    let tag = part.tag;
    let vr = part.vr;
    let new_location = (() => {
      if (vr instanceof $value_representation.OtherByteString) {
        return new EncapsulatedPixelDataSequence(vr, toList([]));
      } else if (vr instanceof $value_representation.OtherWordString) {
        return new EncapsulatedPixelDataSequence(vr, toList([]));
      } else {
        return new Sequence(tag, toList([]));
      }
    })();
    let _pipe = builder.withFields({
      location: listPrepend(new_location, builder.location)
    });
    return new Ok(_pipe);
  } else if (part instanceof $p10_part.SequenceItemDelimiter) {
    let $ = builder.location;
    if ($.atLeastLength(2) &&
    $.head instanceof SequenceItem &&
    $.tail.head instanceof Sequence) {
      let item_data_set = $.head.data_set;
      let tag = $.tail.head.tag;
      let items = $.tail.head.items;
      let rest = $.tail.tail;
      let new_location = listPrepend(
        new Sequence(tag, listPrepend(item_data_set, items)),
        rest,
      );
      return new Ok(builder.withFields({ location: new_location }));
    } else {
      return new Error(
        new $p10_error.PartStreamInvalid(
          "Building data set",
          "Received sequence item delimiter part outside of an item",
          part,
        ),
      );
    }
  } else if (part instanceof $p10_part.End) {
    let $ = builder.location;
    if ($.hasLength(1) && $.head instanceof RootDataSet) {
      return new Ok(builder.withFields({ is_complete: true }));
    } else {
      return new Error(
        new $p10_error.PartStreamInvalid(
          "Building data set",
          "Received end part outside of the root data set",
          part,
        ),
      );
    }
  } else {
    let part$1 = part;
    return unexpected_part_error(part$1, builder);
  }
}

function add_part_in_pending_data_element(builder, part) {
  let $ = builder.pending_data_element;
  if (!($ instanceof Some) || !($[0] instanceof PendingDataElement)) {
    throw makeError(
      "let_assert",
      "dcmfx_p10/data_set_builder",
      336,
      "add_part_in_pending_data_element",
      "Pattern match failed, no pattern matched the value.",
      { value: $ }
    )
  }
  let tag = $[0].tag;
  let vr = $[0].vr;
  let value_bytes = $[0].data;
  if (part instanceof $p10_part.DataElementValueBytes) {
    let data = part.data;
    let bytes_remaining = part.bytes_remaining;
    let new_value_bytes = listPrepend(data, value_bytes);
    if (bytes_remaining === 0) {
      let value = build_final_data_element_value(tag, vr, new_value_bytes);
      let new_location = insert_data_element_at_current_location(
        builder.location,
        tag,
        value,
      );
      let _pipe = builder.withFields({
        location: new_location,
        pending_data_element: new None()
      });
      return new Ok(_pipe);
    } else {
      let _pipe = builder.withFields({
        pending_data_element: (() => {
          let _pipe = new PendingDataElement(tag, vr, new_value_bytes);
          return new Some(_pipe);
        })()
      });
      return new Ok(_pipe);
    }
  } else {
    let part$1 = part;
    return unexpected_part_error(part$1, builder);
  }
}

export function add_part(builder, part) {
  return $bool.guard(
    builder.is_complete,
    new Error(
      new $p10_error.PartStreamInvalid(
        "Building data set",
        "Part received after the part stream has ended",
        part,
      ),
    ),
    () => {
      return $bool.lazy_guard(
        !isEqual(builder.pending_data_element, new None()),
        () => { return add_part_in_pending_data_element(builder, part); },
        () => {
          let $ = builder.location;
          if (part instanceof $p10_part.FilePreambleAndDICMPrefix) {
            let preamble = part.preamble;
            return new Ok(
              builder.withFields({ file_preamble: new Some(preamble) }),
            );
          } else if (part instanceof $p10_part.FileMetaInformation) {
            let data_set = part.data_set;
            return new Ok(
              builder.withFields({ file_meta_information: new Some(data_set) }),
            );
          } else if ($.atLeastLength(1) && $.head instanceof Sequence) {
            return add_part_in_sequence(builder, part);
          } else if ($.atLeastLength(1) &&
          $.head instanceof EncapsulatedPixelDataSequence) {
            return add_part_in_encapsulated_pixel_data_sequence(builder, part);
          } else {
            return add_part_in_data_set(builder, part);
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
      let builder$1 = builder.withFields({ pending_data_element: new None() });
      let part = (() => {
        let $ = builder$1.location;
        if ($.atLeastLength(1) && $.head instanceof Sequence) {
          return new $p10_part.SequenceDelimiter();
        } else if ($.atLeastLength(1) &&
        $.head instanceof EncapsulatedPixelDataSequence) {
          return new $p10_part.SequenceDelimiter();
        } else if ($.atLeastLength(1) && $.head instanceof SequenceItem) {
          return new $p10_part.SequenceItemDelimiter();
        } else {
          return new $p10_part.End();
        }
      })();
      let $ = (() => {
        let _pipe = builder$1;
        return add_part(_pipe, part);
      })();
      if (!$.isOk()) {
        throw makeError(
          "let_assert",
          "dcmfx_p10/data_set_builder",
          131,
          "",
          "Pattern match failed, no pattern matched the value.",
          { value: $ }
        )
      }
      let builder$2 = $[0];
      return force_end(builder$2);
    },
  );
}
