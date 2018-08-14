import { Token } from '../tokens/token.interface';

export interface LexedExpression {
  text: string;
  lexed: Token[];
}
