import test from 'ava';
import { assert } from '../helpers/assert';

import { Sub } from '../../src';

test('Can subtract two numbers', t => {
    type ten = Sub<22, 12>;
    assert<ten, 10>(t);
});
