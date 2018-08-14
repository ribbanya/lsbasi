import { TokenTypes } from './token-types.enum';

export interface Token {
  type: TokenTypes;
  value: string;
  position: number;
}
