
/**
 * Checar verdadeiro
 * Checa se o predicado (segundo argumento) é verdadeiro em todos os elementos de uma colecao (primeiro argumento)
 * Use `Array.prototype.every()` para checar caso cada objeto passado possui a propriedade especificada e caso positivo
 * retorna um valor positivo.
 * @param {*} collection 
 * @param {*} pre 
 */
const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);

truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'); // true

/**
 * Match com
 * Compara dois objetos para determinar se o primeiro contem valores de propriedade equivalente ao segundo,
 * baseado na funcao providenciada.
 * Use `Objetct.keys(source)` para obter todas as chaves do segundo objeto, e entao `Array.prototype.every()`, 
 * `Object.hasOwnProperty` e a funcao dada para determinar caso todas as chaves existam no primeiro objeto
 * e possuem valores equivalentes.
 * Caso nenhuma funcao seja providenciada, os valores serao comparados usando o operador `igual`
 * @param {*} obj 
 * @param {*} source 
 * @param {*} fn 
 */
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) && fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] == source[key]
  );

const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
); // true

/**
 * Match
 * Compara dois objetos para determinar se o primeiro possui propriedade equivalente ao segundo.
 * Use `Object.keys(source)` para obter todas as chaves do segundo objeto, e entao `Array.prototype.every()`,
 * `Object.hasOwnProperty()` e comparacao strita para determinar se todas as chaves existem no primeiro objeto e
 * possuem os mesmos valores.
 * @param {*} obj 
 * @param {*} source 
 */
const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }); // true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true }); // false

/**
 * Possui sinalizador
 * Checa caso os argumentos do atual processo possuem os sinalizadores especificados.
 * Use `Array.prototype.every()`e `Array.prototype.includes()` para checar caso `process.argv` 
 * contem todas os sinalizadores especificados.
 * Use uma expressao regular para testar se os sinalizadores especificados sao prefixados com `-` ou `--` e prefixe-os
 * de acordo.
 * @param  {...any} flags 
 */
const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));

// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false

/**
 * Filtrar nao-unico por
 * Filtra os valores nao-unicos em uma colecao, baseado na funcao comparadora
 * Use `Array.prototype.filter()`e `Array.prototype.every()` para uma colecao contendo apenas valores unicos, baseados em `fn`
 * A funcao comparadora recebe quatro argumentos: os valores dos dois elementos sendo comparados e seus indexes.
 * @param {*} arr 
 * @param {*} fn 
 */
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]

equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' }); // true

/**
 * Todos iguais
 * Checa se todos os elementos em uma colecao sao iguais.
 * Use `Array.prototyp.every()` para checar se todos os elementos de uma colecao sao iguais ao primeiro.
 * @param {*} arr 
 */
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true

/**
 * Todos
 * Retorna `true` caso a funcao predicado providenciada retorna `true`para todos os elementos em uma colecao, 
 * `false` caso contrario.
 * Use `Array.prototype.every()` para testar se todos os elementos na colecao retornam `true` baseado em `fn`
 * Omitir o segundo argumento, `fn`, para usar `Boolean` como valor padrao. 
 * @param {*} arr 
 * @param {*} fn 
 */
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
