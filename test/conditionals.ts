import test from 'ava';
import { And, Bool, False, If, Nand, Not, Or, True, Xor } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass() }

// Conditionals

test('Can assign type conditionally', t => {
    type conditional<C extends Bool> = If<C, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, string>(t);
    assert<gotT, number>(t);
});

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

test('Conditions can be based on XOR', t => {
    assert<Xor<True, True>,   False>(t);
    assert<Xor<False, True>,  True>(t);
    assert<Xor<True, False>,  True>(t);
    assert<Xor<False, False>, False>(t);
});

test('Conditions can be based on NAND', t => {
    assert<Nand<True, True>,   False>(t);
    assert<Nand<False, True>,  True>(t);
    assert<Nand<True, False>,  True>(t);
    assert<Nand<False, False>, True>(t);
});

test('Conditional logic can be inversed with NOT', t => {
    type conditional<C extends Bool> = If<Not<C>, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, number>(t);
    assert<gotT, string>(t);
});
