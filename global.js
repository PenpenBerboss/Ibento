// Polyfills pour Hermes
import process from 'process';
import { Buffer } from 'buffer';

global.process = process;
global.Buffer = Buffer;

// Autres polyfills si nécessaire
if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
  global.process = process;
} else {
  for (const p in process) {
    if (!(p in global.process)) {
      global.process[p] = process[p];
    }
  }
}
