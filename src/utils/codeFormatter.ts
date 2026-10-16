/**
 * Lightweight, robust code formatters for HTML, CSS, and JavaScript
 */

export function formatHTML(html: string, tabSize = 2): string {
  const indent = ' '.repeat(tabSize);
  let formatted = '';
  let pad = 0;

  // Normalize lines and tags
  const tokens = html
    .replace(/>\s*</g, '><')
    .replace(/</g, '\n<')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  for (const token of tokens) {
    if (token.match(/^<\/\w/)) {
      pad = Math.max(0, pad - 1);
    }

    formatted += indent.repeat(pad) + token + '\n';

    // If opening tag that is not self-closing or void tag
    const isOpening = token.match(/^<[^\/!][^>]*[^\/]>/);
    const isVoid = token.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i);
    const hasClosingInSameLine = token.match(/^<[^\/!][^>]*>.*<\/[^>]+>$/);

    if (isOpening && !isVoid && !hasClosingInSameLine) {
      pad++;
    }
  }

  return formatted.trim();
}

export function formatCSS(css: string, tabSize = 2): string {
  const indent = ' '.repeat(tabSize);
  // Remove redundant whitespaces
  let cleaned = css.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/\{\s*/g, ' {\n');
  cleaned = cleaned.replace(/;\s*/g, ';\n');
  cleaned = cleaned.replace(/\s*\}\s*/g, '\n}\n\n');

  const lines = cleaned.split('\n');
  let pad = 0;
  let formatted = '';

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.includes('}')) {
      pad = Math.max(0, pad - 1);
    }

    formatted += indent.repeat(pad) + line + '\n';

    if (line.includes('{')) {
      pad++;
    }
  }

  return formatted.trim();
}

export function formatJS(js: string, tabSize = 2): string {
  const indent = ' '.repeat(tabSize);
  const lines = js.split('\n');
  let formatted = '';
  let pad = 0;

  for (let line of lines) {
    let trimmed = line.trim();
    if (!trimmed) {
      formatted += '\n';
      continue;
    }

    // Decrement indent if starts with closing bracket
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      pad = Math.max(0, pad - 1);
    }

    formatted += indent.repeat(pad) + trimmed + '\n';

    // Count opening vs closing braces
    const openBraces = (trimmed.match(/[\{\[\(]/g) || []).length;
    const closeBraces = (trimmed.match(/[\}\]\)]/g) || []).length;
    const diff = openBraces - closeBraces;

    if (diff > 0) {
      pad += diff;
    } else if (diff < 0 && !trimmed.startsWith('}') && !trimmed.startsWith(']') && !trimmed.startsWith(')')) {
      pad = Math.max(0, pad + diff);
    }
  }

  return formatted.trim();
}
