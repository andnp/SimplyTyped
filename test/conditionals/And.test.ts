import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If, And } from '../../src';

test('Conditions can be based on AND', t => {
    type conditional<C extends Bool, D extends Bool> = If<And<C, D>, number, string>;
    type gotFF = conditional<False, False>;
    type gotFT = conditional<False, True>;
    type gotTF = conditional<True, False>;
    type gotTT = conditional<True, True>;

    assert<gotFF, string>(t);
    assert<gotFT, string>(t);
    assert<gotTF, string>(t);
    assert<gotTT, number>(t);
});
