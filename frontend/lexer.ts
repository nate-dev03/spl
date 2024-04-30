export enum TokenType {
  // Literal types
  Number,
  Identifier,

  BinaryOperator,
  Equals,
  OpenParen,
  CloseParen,

  // Keywords
  Let,

  EOF, // Signifies the end of file
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

export interface Token {
  type: TokenType;
  value: string;
}

function token(type: TokenType, value = ""): Token {
  return { type, value };
}

function isAlpha(str: string): boolean {
  return /[a-zA-Z_]/.test(str);
}

function isSkippable(str: string): boolean {
  return str === " " || str === "\t" || str === "\n";
}

function isInt(str: string): boolean {
  return /^[0-9]$/.test(str);
}

export function tokenize(sourceCode: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < sourceCode.length) {
    const char = sourceCode[index];

    if (char === "(") {
      tokens.push(token(TokenType.OpenParen, char));
    } else if (char === ")") {
      tokens.push(token(TokenType.CloseParen, char));
    } else if (
      char === "+" || char === "-" || char === "*" || char === "/" ||
      char === "%"
    ) {
      tokens.push(token(TokenType.BinaryOperator, char));
    } else if (char === "=") {
      tokens.push(token(TokenType.Equals, char));
    } else {
      // Handle multi-character tokens

      // Build number token
      if (isInt(char)) {
        let num = "";
        while (index < sourceCode.length && isInt(sourceCode[index])) {
          num += sourceCode[index];
          index++;
        }
        tokens.push(token(TokenType.Number, num));
        continue;
      }

      // Build identifier token
      if (isAlpha(char)) {
        let ident = "";
        while (
          index < sourceCode.length &&
          (isAlpha(sourceCode[index]) || isInt(sourceCode[index]))
        ) {
          ident += sourceCode[index];
          index++;
        }

        // Check for reserved keywords
        const reserved = KEYWORDS[ident];
        if(typeof reserved == "number") {
          tokens.push(token(reserved, ident));
        } else {
          tokens.push(token(TokenType.Identifier, ident));
        }
        continue;
      }

      if (isSkippable(char)) {
        index++; // Skip the current character
        continue;
      }

      console.error("Unrecognized character found in source: ", char);
      Deno.exit(1);
    }

    index++;
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}
