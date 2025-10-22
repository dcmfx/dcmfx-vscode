/// <reference types="./deque.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  isEqual,
} from "../gleam.mjs";

class Deque extends $CustomType {
  constructor(in$, out) {
    super();
    this.in = in$;
    this.out = out;
  }
}

/**
 * Creates a fresh deque that contains no values.
 */
export function new$() {
  return new Deque(toList([]), toList([]));
}

/**
 * Converts a list of elements into a deque of the same elements in the same
 * order. The first element in the list becomes the front element in the deque.
 *
 * This function runs in constant time.
 *
 * # Examples
 *
 * ```gleam
 * [1, 2, 3] |> from_list |> length
 * // -> 3
 * ```
 */
export function from_list(list) {
  return new Deque(toList([]), list);
}

/**
 * Converts a deque of elements into a list of the same elements in the same
 * order. The front element in the deque becomes the first element in the list.
 *
 * This function runs in linear time.
 *
 * # Examples
 *
 * ```gleam
 * new() |> push_back(1) |> push_back(2) |> to_list
 * // -> [1, 2]
 * ```
 */
export function to_list(deque) {
  let _pipe = deque.out;
  return $list.append(_pipe, $list.reverse(deque.in));
}

/**
 * Determines whether or not the deque is empty.
 *
 * This function runs in constant time.
 *
 * ## Examples
 *
 * ```gleam
 * [] |> from_list |> is_empty
 * // -> True
 * ```
 *
 * ```gleam
 * [1] |> from_list |> is_empty
 * // -> False
 * ```
 *
 * ```gleam
 * [1, 2] |> from_list |> is_empty
 * // -> False
 * ```
 */
export function is_empty(deque) {
  return (isEqual(deque.in, toList([]))) && (isEqual(deque.out, toList([])));
}

/**
 * Counts the number of elements in a given deque.
 *
 * This function has to traverse the deque to determine the number of elements,
 * so it runs in linear time.
 *
 * ## Examples
 *
 * ```gleam
 * length(from_list([]))
 * // -> 0
 * ```
 *
 * ```gleam
 * length(from_list([1]))
 * // -> 1
 * ```
 *
 * ```gleam
 * length(from_list([1, 2]))
 * // -> 2
 * ```
 */
export function length(deque) {
  return $list.length(deque.in) + $list.length(deque.out);
}

/**
 * Pushes an element onto the back of the deque.
 *
 * # Examples
 *
 * ```gleam
 * [1, 2] |> from_list |> push_back(3) |> to_list
 * // -> [1, 2, 3]
 * ```
 */
export function push_back(deque, item) {
  return new Deque(listPrepend(item, deque.in), deque.out);
}

/**
 * Pushes an element onto the front of the deque.
 *
 * # Examples
 *
 * ```gleam
 * [0, 0] |> from_list |> push_front(1) |> to_list
 * // -> [1, 0, 0]
 * ```
 */
export function push_front(deque, item) {
  return new Deque(deque.in, listPrepend(item, deque.out));
}

/**
 * Gets the last element from the deque, returning the
 * element and a new deque without that element.
 *
 * This function typically runs in constant time, but will occasionally run in
 * linear time.
 *
 * # Examples
 *
 * ```gleam
 * new()
 * |> push_back(0)
 * |> push_back(1)
 * |> pop_back
 * // -> Ok(#(1, push_front(new(), 0)))
 * ```
 *
 * ```gleam
 * new()
 * |> push_front(0)
 * |> pop_back
 * // -> Ok(#(0, new()))
 * ```
 *
 * ```gleam
 * new() |> pop_back
 * // -> Error(Nil)
 * ```
 */
export function pop_back(loop$deque) {
  while (true) {
    let deque = loop$deque;
    let $ = deque.in;
    if ($ instanceof $Empty) {
      let $1 = deque.out;
      if ($1 instanceof $Empty) {
        return new Error(undefined);
      } else {
        let out = $1;
        loop$deque = new Deque($list.reverse(out), toList([]));
      }
    } else {
      let out = deque.out;
      let first = $.head;
      let rest = $.tail;
      let deque$1 = new Deque(rest, out);
      return new Ok([first, deque$1]);
    }
  }
}

/**
 * Gets the first element from the deque, returning the
 * element and a new deque without that element.
 *
 * This function typically runs in constant time, but will occasionally run in
 * linear time.
 *
 * # Examples
 *
 * ```gleam
 * new()
 * |> push_front(1)
 * |> push_front(0)
 * |> pop_front
 * // -> Ok(#(0, push_back(new(), 1)))
 * ```
 *
 * ```gleam
 * new()
 * |> push_back(0)
 * |> pop_front
 * // -> Ok(#(0, new()))
 * ```
 *
 * ```gleam
 * new() |> pop_back
 * // -> Error(Nil)
 * ```
 */
export function pop_front(loop$deque) {
  while (true) {
    let deque = loop$deque;
    let $ = deque.out;
    if ($ instanceof $Empty) {
      let $1 = deque.in;
      if ($1 instanceof $Empty) {
        return new Error(undefined);
      } else {
        let in$ = $1;
        loop$deque = new Deque(toList([]), $list.reverse(in$));
      }
    } else {
      let in$ = deque.in;
      let first = $.head;
      let rest = $.tail;
      let deque$1 = new Deque(in$, rest);
      return new Ok([first, deque$1]);
    }
  }
}

/**
 * Creates a new deque from a given deque containing the same elements, but in
 * the opposite order.
 *
 * This function runs in constant time.
 *
 * ## Examples
 *
 * ```gleam
 * [] |> from_list |> reverse |> to_list
 * // -> []
 * ```
 *
 * ```gleam
 * [1] |> from_list |> reverse |> to_list
 * // -> [1]
 * ```
 *
 * ```gleam
 * [1, 2] |> from_list |> reverse |> to_list
 * // -> [2, 1]
 * ```
 */
export function reverse(deque) {
  return new Deque(deque.out, deque.in);
}

function check_equal(loop$xs, loop$x_tail, loop$ys, loop$y_tail, loop$eq) {
  while (true) {
    let xs = loop$xs;
    let x_tail = loop$x_tail;
    let ys = loop$ys;
    let y_tail = loop$y_tail;
    let eq = loop$eq;
    if (xs instanceof $Empty) {
      if (x_tail instanceof $Empty) {
        if (ys instanceof $Empty) {
          if (y_tail instanceof $Empty) {
            return true;
          } else {
            loop$xs = xs;
            loop$x_tail = x_tail;
            loop$ys = $list.reverse(y_tail);
            loop$y_tail = toList([]);
            loop$eq = eq;
          }
        } else {
          return false;
        }
      } else {
        loop$xs = $list.reverse(x_tail);
        loop$x_tail = toList([]);
        loop$ys = ys;
        loop$y_tail = y_tail;
        loop$eq = eq;
      }
    } else if (ys instanceof $Empty) {
      if (y_tail instanceof $Empty) {
        return false;
      } else {
        loop$xs = xs;
        loop$x_tail = x_tail;
        loop$ys = $list.reverse(y_tail);
        loop$y_tail = toList([]);
        loop$eq = eq;
      }
    } else {
      let x = xs.head;
      let xs$1 = xs.tail;
      let y = ys.head;
      let ys$1 = ys.tail;
      let $ = eq(x, y);
      if ($) {
        loop$xs = xs$1;
        loop$x_tail = x_tail;
        loop$ys = ys$1;
        loop$y_tail = y_tail;
        loop$eq = eq;
      } else {
        return $;
      }
    }
  }
}

/**
 * Checks whether two deques have equal elements in the same order, where the
 * equality of elements is determined by a given equality checking function.
 *
 * This function is useful as the internal representation may be different for
 * two deques with the same elements in the same order depending on how they
 * were constructed, so the equality operator `==` may return surprising
 * results.
 *
 * This function runs in linear time multiplied by the time taken by the
 * element equality checking function.
 */
export function is_logically_equal(a, b, element_is_equal) {
  return check_equal(a.out, a.in, b.out, b.in, element_is_equal);
}

/**
 * Checks whether two deques have the same elements in the same order.
 *
 * This function is useful as the internal representation may be different for
 * two deques with the same elements in the same order depending on how they
 * were constructed, so the equality operator `==` may return surprising
 * results.
 *
 * This function runs in linear time.
 */
export function is_equal(a, b) {
  return check_equal(
    a.out,
    a.in,
    b.out,
    b.in,
    (a, b) => { return isEqual(a, b); },
  );
}
