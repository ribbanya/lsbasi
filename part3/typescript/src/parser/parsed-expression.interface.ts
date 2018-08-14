import { LexedExpression } from '../lexer';

export interface ParsedExpression extends LexedExpression {
  parsed: number;
}
