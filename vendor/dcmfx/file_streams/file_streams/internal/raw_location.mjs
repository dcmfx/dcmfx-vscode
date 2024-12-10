/// <reference types="./raw_location.d.mts" />
import { CustomType as $CustomType } from "../../gleam.mjs";

export class Bof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class Cur extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}

export class Eof extends $CustomType {
  constructor(offset) {
    super();
    this.offset = offset;
  }
}
