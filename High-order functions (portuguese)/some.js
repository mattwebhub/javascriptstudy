
/**
 * Nenhum
 * Retorna verdadeiro caso a funcao predicado dada retorna falso para todos os elementos em uma colecao, falso caso contrario
 * Use `Array.prototype.some()` para testar caso algum elemento na colecao retorna true baseado em `fn`.
 * Omitir o segundo argumento, `fn`, para usar Boolean como valor padrao.
 * @param {*} arr 
 * @param {*} fn 
 */
const none = (arr, fn = Boolean) => !arr.some(fn);
none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true

/**
 * Qualquer
 * Retorna verdadeiro caso a funcao predicado dado retorna verdadeiro para pelo menos um elemento na colecao
 * Falso, caso contrario
 * Use `Array.prototype.some()` para testar caso algum elemento na colecao retorna verdadeiro baseado em `fn`.
 * Omitir o segundo argumento, `fn`, para usar Boolean, como valor padrao.
 * @param {*} arr 
 * @param {*} fn 
 */
const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true

/**
 * Elementos unicos por
 * Retorna todos os elementos unicos na colecao, baseado na funcao comparadora dada.
 * Use `Array.prototype.reduce()` e `Array.prototype.some()` para uma colecao contendo apenas a primeira unica ocorrencia de cada valor,
 * baseado na funcao comparadora `fn`.
 * A funcao comparadora recebe dois argumentos: os valores dos dois elementos sendo comparados
 * @param {*} arr 
 * @param {*} fn 
 */
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

uniqueElementsBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]


/**
 * Elementos unicos pela direita
 * Retorna todos os valores unicos de uma colecao, baseado em uma funcao comparadora dada.
 * Use `Array.prototype.reduce()` e `Array.prototype.some()` por cada colecao contendo apenas a ultima unica ocorrencia de cada valor,
 * baseado na funcao comparadora dada, `fn`. A funcao comparadora recebe dois argumentos: os valores de dois elementos sendo comprados.
 * @param {*} arr
 * @param {*} fn
 */
const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

uniqueElementsByRight(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]