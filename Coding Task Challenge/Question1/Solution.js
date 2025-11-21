// specialCipher.js
function caesarRotateChar(ch, rot) {
  const A = 'A'.charCodeAt(0), Z = 'Z'.charCodeAt(0);
  const a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0);
  const code = ch.charCodeAt(0);
  if (code >= A && code <= Z) {
    return String.fromCharCode(((code - A + rot) % 26) + A);
  } else if (code >= a && code <= z) {
    return String.fromCharCode(((code - a + rot) % 26) + a);
  }
  return ch;
}

function caesarRotateString(s, rot) {
  return [...s].map(ch => caesarRotateChar(ch, rot)).join('');
}

function rleEncode(s) {
  if (!s) return '';
  let out = '';
  let cur = s[0];
  let cnt = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === cur) cnt++;
    else {
      out += cur + (cnt > 1 ? String(cnt) : '');
      cur = s[i];
      cnt = 1;
    }
  }
  out += cur + (cnt > 1 ? String(cnt) : '');
  return out;
}

function specialCipher(input, rot) {
  const rotated = caesarRotateString(input, rot);
  return rleEncode(rotated);
}

// Example:
console.log(specialCipher("AABCCC", 3)); 
module.exports = { specialCipher };
