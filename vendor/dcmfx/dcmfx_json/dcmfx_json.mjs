/// <reference types="./dcmfx_json.d.mts" />
import * as $data_set from "../dcmfx_core/dcmfx_core/data_set.mjs";
import * as $data_set_path from "../dcmfx_core/dcmfx_core/data_set_path.mjs";
import * as $p10_write from "../dcmfx_p10/dcmfx_p10/p10_write.mjs";
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $pair from "../gleam_stdlib/gleam/pair.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $json_to_data_set from "./dcmfx_json/internal/json_to_data_set.mjs";
import * as $json_config from "./dcmfx_json/json_config.mjs";
import * as $json_error from "./dcmfx_json/json_error.mjs";
import * as $p10_json_transform from "./dcmfx_json/transforms/p10_json_transform.mjs";

export function data_set_to_json(data_set, config) {
  let transform = $p10_json_transform.new$(config);
  let context = ["", transform];
  let _pipe = $p10_write.data_set_to_tokens(
    data_set,
    context,
    (context, token) => {
      let json = context[0];
      let transform$1 = context[1];
      return $result.map(
        $p10_json_transform.add_token(transform$1, token),
        (_use0) => {
          let new_json = _use0[0];
          let transform$2 = _use0[1];
          return [json + new_json, transform$2];
        },
      );
    },
  );
  return $result.map(_pipe, $pair.first);
}

export function json_to_data_set(data_set_json) {
  let data_set_json$1 = (() => {
    let _pipe = $json.parse(data_set_json, $decode.dynamic);
    return $result.replace_error(
      _pipe,
      new $json_error.JsonInvalid(
        "Input is not valid JSON",
        $data_set_path.new$(),
      ),
    );
  })();
  return $result.try$(
    data_set_json$1,
    (data_set_json) => {
      return $json_to_data_set.convert_json_to_data_set(
        data_set_json,
        $data_set_path.new$(),
      );
    },
  );
}
