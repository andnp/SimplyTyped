import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If, Not } from '../../src';

test('Conditional logic can be inversed with NOT', t => {
    type conditional<C extends Bool> = If<Not<C>, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, number>(t);
    assert<gotT, string>(t);
});
