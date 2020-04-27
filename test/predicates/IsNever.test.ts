import test from 'ava';
import { assert } from '../helpers/assert';

import { False, True, IsNever } from '../../src';

test('Can ask if T is of type "never"', t => {
    assert<IsNever<'hi'>, False>(t);
    assert<IsNever<any>, False>(t);
    assert<IsNever<object>, False>(t);
    assert<IsNever<Function>, False>(t);
    assert<IsNever<() => string>, False>(t);
    assert<IsNever<number>, False>(t);
    assert<IsNever<boolean>, False>(t);
    assert<IsNever<string | number>, False>(t);
    assert<IsNever<unknown>, False>(t);
    assert<IsNever<null>, False>(t);
    assert<IsNever<undefined>, False>(t);

    assert<IsNever<never>, True>(t);
});
