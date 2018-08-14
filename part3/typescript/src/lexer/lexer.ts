import { LexedExpression } from './lexed-expression.interface';
import { TokenTypes } from './token-types.enum';
import { Token } from './token.interface';

const map: { [key: string]: TokenTypes } = {
  '*': TokenTypes.MULTIPLY,
  '+': TokenTypes.ADD,
  '-': TokenTypes.SUBTRACT,
  '/': TokenTypes.DIVIDE,
};

// map[0-9]: TokenTypes.INTEGER
[...'0123456789'].forEach(
  (c) => map[c] = TokenTypes.INTEGER,
);

function error(position: number) {
  return Error(`Lexical error at position ${position}.`);
}

export function lex(input: string): LexedExpression {
  const output: Token[] = [];
  [...input].forEach((char: string, pos: number) => {
    if (char.match(/\s/)) return;

    const type = map[char];
    if (!type) throw error(pos);

    output.push({ type, value: char, position: pos });
  });
  return { input, output };
}
