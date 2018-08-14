import promptSync from 'prompt-sync';
import { lex } from './lexer';

const prompt = promptSync({ sigint: true });

for (; ;) console.log(lex(prompt('calc> ')));
