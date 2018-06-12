import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If } from '../../src';

test('Can assign type conditionally', t => {
    type conditional<C extends Bool> = If<C, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, string>(t);
    assert<gotT, number>(t);
});
