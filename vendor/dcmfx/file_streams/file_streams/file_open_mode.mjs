/// <reference types="./file_open_mode.d.mts" />
import * as $text_encoding from "../file_streams/text_encoding.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

export class Append extends $CustomType {}

export class Binary extends $CustomType {}

export class DelayedWrite extends $CustomType {
  constructor(size, delay) {
    super();
    this.size = size;
    this.delay = delay;
  }
}

export class Encoding extends $CustomType {
  constructor(encoding) {
    super();
    this.encoding = encoding;
  }
}

export class Exclusive extends $CustomType {}

export class Raw extends $CustomType {}

export class Read extends $CustomType {}

export class ReadAhead extends $CustomType {
  constructor(size) {
    super();
    this.size = size;
  }
}

export class Write extends $CustomType {}
