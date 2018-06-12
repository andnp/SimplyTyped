import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If, Or } from '../../src';

test('Conditions can be based on OR', t => {
    type conditional<C extends Bool, D extends Bool> = If<Or<C, D>, number, string>;
    type gotFF = conditional<False, False>;
    type gotFT = conditional<False, True>;
    type gotTF = conditional<True, False>;
    type gotTT = conditional<True, True>;

    assert<gotFF, string>(t);
    assert<gotFT, number>(t);
    assert<gotTF, number>(t);
    assert<gotTT, number>(t);
});
