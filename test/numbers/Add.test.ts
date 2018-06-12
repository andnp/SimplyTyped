import test from 'ava';
import { assert } from '../helpers/assert';

import { Add } from '../../src';

test('Can add two numbers', t => {
    type fifty = Add<12, 38>;
    assert<fifty, 50>(t);
});
