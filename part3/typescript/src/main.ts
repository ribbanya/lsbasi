import promptSync from 'prompt-sync';
import { lex } from './lexer';
import { parse } from './parser';

const prompt = promptSync({ sigint: true });

for (; ;) console.log(parse(lex(prompt('calc> '))));
