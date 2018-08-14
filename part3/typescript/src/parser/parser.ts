import { EOF, LexedExpression } from '../lexer';
import { Token, TokenTypes } from '../tokens';
import { ParsedExpression } from './parsed-expression.interface';

function error(token: Token) {
  return Error(`Syntax error at position ${token.position}: '${token.value}'.`);
}

export function parse(lexed: LexedExpression): ParsedExpression {
  let last: Token | null = null;
  let parsed = 0;
  lexed.lexed.forEach((token) => {
    if (token.type === TokenTypes.INTEGER) {
      const value = parseInt(token.value, 10);
      const type = last ? last.type : TokenTypes.ADD;
      switch (type) {
        case TokenTypes.ADD:
          parsed += value;
          break;
        case TokenTypes.SUBTRACT:
          parsed -= value;
          break;
        // case TokenTypes.MULTIPLY:
        //   parsed *= value;
        //   break;
        // case TokenTypes.DIVIDE:
        //   parsed /= value;
        //   break;
      }
    } else if (!last || last.type !== TokenTypes.INTEGER) {
      throw error(last || EOF(0));
    }
    last = token;
  });
  return Object.assign({ parsed }, lexed);
}
