import { FiddleState } from '../types';

export function buildPreviewDoc(fiddle: FiddleState): string {
  const { html, css, javascript, externalResources, cssSettings, jsSettings } = fiddle;

  // External CSS links
  const cssLinks = externalResources
    .filter(res => res.enabled && res.type === 'css')
    .map(res => `<link rel="stylesheet" href="${res.url}">`)
    .join('\n');

  // External JS scripts
  const jsScripts = externalResources
    .filter(res => res.enabled && res.type === 'js')
    .map(res => `<script src="${res.url}"></script>`)
    .join('\n');

  // Normalize CSS if toggled
  const normalizeCss = cssSettings.normalize
    ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">`
    : '';

  // Safe Console Interception & Command Runner script
  const consoleProxyScript = `
    <script>
      (function() {
        const _serialize = function(val, depth) {
          depth = depth || 0;
          if (depth > 2) return '[Deep Object]';
          if (val === null) return 'null';
          if (val === undefined) return 'undefined';
          if (typeof val === 'function') return '[Function: ' + (val.name || 'anonymous') + ']';
          if (val instanceof Error) return val.toString() + (val.stack ? '\\n' + val.stack : '');
          if (typeof val === 'object') {
            if (val.nodeType) return '<' + val.nodeName.toLowerCase() + (val.id ? ' id="' + val.id + '"' : '') + '>';
            try {
              return JSON.stringify(val, function(k, v) {
                if (typeof v === 'function') return '[Function]';
                return v;
              }, 2);
            } catch (e) {
              return String(val);
            }
          }
          return String(val);
        };

        const _send = function(type, args) {
          try {
            const formatted = Array.from(args).map(function(a) { return _serialize(a); }).join(' ');
            window.parent.postMessage({
              source: 'NEXVORA_PREVIEW',
              type: type,
              content: formatted,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }, '*');
          } catch (err) {}
        };

        const origLog = console.log;
        const origInfo = console.info;
        const origWarn = console.warn;
        const origError = console.error;

        console.log = function() { _send('log', arguments); origLog.apply(console, arguments); };
        console.info = function() { _send('info', arguments); origInfo.apply(console, arguments); };
        console.warn = function() { _send('warn', arguments); origWarn.apply(console, arguments); };
        console.error = function() { _send('error', arguments); origError.apply(console, arguments); };

        window.onerror = function(msg, url, line, col, error) {
          _send('error', [msg + (line ? ' (line ' + line + ')' : '')]);
          return false;
        };

        window.addEventListener('unhandledrejection', function(event) {
          _send('error', ['Unhandled Promise Rejection: ' + (event.reason ? _serialize(event.reason) : 'Unknown')]);
        });

        // Listen for console commands from parent
        window.addEventListener('message', function(e) {
          if (e.data && e.data.action === 'NEXVORA_EVAL') {
            try {
              const res = window.eval(e.data.code);
              console.log('<= ' + _serialize(res));
            } catch (err) {
              console.error(err);
            }
          }
        });
      })();
    </script>
  `;

  // Wrap user javascript according to loadType
  let wrappedJs = javascript;
  if (jsSettings.loadType === 'onLoad') {
    wrappedJs = `window.addEventListener('load', function() {\n${javascript}\n});`;
  } else if (jsSettings.loadType === 'onDOMContentLoaded') {
    wrappedJs = `document.addEventListener('DOMContentLoaded', function() {\n${javascript}\n});`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fiddle.title || 'NexVora Playground Output'}</title>
  ${normalizeCss}
  ${cssLinks}
  <style>
    ${css}
  </style>
  ${consoleProxyScript}
  ${jsSettings.loadType === 'head' ? jsScripts : ''}
  ${jsSettings.loadType === 'head' ? `<script>${wrappedJs}</script>` : ''}
</head>
<body>
  ${html}

  ${jsSettings.loadType !== 'head' ? jsScripts : ''}
  ${jsSettings.loadType !== 'head' ? `<script>${wrappedJs}</script>` : ''}
</body>
</html>`;
}
