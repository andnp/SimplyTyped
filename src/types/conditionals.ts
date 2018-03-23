import { StringEqual } from './strings';

export type True = '1';
export type False = '0';
export type Bool = False | True;
export type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;
export type Not<A extends Bool> = A extends True ? False : True;
export type And<A extends Bool, B extends Bool> = If<A, If<B, True, False>, False>;
export type Or<A extends Bool, B extends Bool> = If<A, True, If<B, True, False>>;
export type Xor<A extends Bool, B extends Bool> = Or<And<A, Not<B>>, And<Not<A>, B>>;
export type Nand<A extends Bool, B extends Bool> = Not<And<A, B>>;

export type ReallyTrue<A extends Bool> = StringEqual<A, True>;
