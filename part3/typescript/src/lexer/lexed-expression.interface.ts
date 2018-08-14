import { Token } from './token.interface';

export interface LexedExpression {
  input?: string;
  output: Token[];
}
