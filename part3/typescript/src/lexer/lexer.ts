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

function error(char: string, pos: number) {
  return Error(`Lexical error at position ${pos}: '${char}'.`);
}

export function lex(input: string): LexedExpression {
  const output: Token[] = [];
  let last: Token | null = null;
  [...input].forEach((char: string, pos: number) => {
    if (char.match(/\s/)) {
      last = null;
      return;
    }

    const type = map[char];

    if (!type) throw error(char, pos);

    let current;

    if (
      type === TokenTypes.INTEGER
      && last
      && last.type === TokenTypes.INTEGER
    ) {
      current = last;
      current.value += char;
      current.length += 1;
    } else {
      current = {
        length: 1,
        position: pos,
        type,
        value: char,
      };
      output.push(current);
    }
    last = current;
  });
  return { input, output };
}
