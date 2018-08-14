import { Token } from './token.interface';

export interface LexedExpression {
  text: string;
  lexed: Token[];
}
