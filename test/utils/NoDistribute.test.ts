import test from 'ava';
import { assert } from '../helpers/assert';

import { NoDistribute } from '../../src';

test("can create a conditional type that won't distribute over unions", t => {
    type IsString<T> = T extends string ? "Yes" : "No";
    type IsStringNoDistribute<T> = NoDistribute<T> extends string ? "Yes" : "No";

    /**
     * Evaluates as:
     * ("foo" extends string ? "Yes" : "No")
     *  | (42 extends string ? "Yes" : "No")
     */
    type T1 = IsString<"foo" | 42>;
    assert<T1, "Yes" | "No">(t);
    assert<"Yes" | "No", T1>(t);

    /**
     * Evaluates as:
     * ("foo" | 42) extends string ? "Yes" : "No"
     */
    type T2 = IsStringNoDistribute<"foo" | 5>;
    assert<T2, "No">(t);
    assert<"No", T2>(t);
});

test("cannot be used to prevent a distributive conditional from distributing", t => {
    type IsString<T> = T extends string ? "Yes" : "No";
    // It's the defintion of the conditional type that matters,
    //  not the type that's passed in, so this still distributes
    type Test = IsString<NoDistribute<"foo" | 42>>;
    assert<Test, "Yes" | "No">(t);
    assert<"Yes" | "No", Test>(t);
});
