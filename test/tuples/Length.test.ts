import test from 'ava';
import { assert } from '../helpers/assert';

import { Length } from '../../src';

test('Can get the length of a tuple', t => {
    type t = [1, 2, 3, 4];
    type x = ['hello', 'world'];

    type gotT = Length<t>;
    type gotX = Length<x>;

    assert<gotX, 2>(t);
    assert<gotT, 4>(t);
});
