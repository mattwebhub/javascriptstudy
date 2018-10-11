
/**
 * É anagrama?
 * Checa se a string é um anagrama de outra string(não importa se é maiuscula, se há espacos ou caracteres especiais)
 * Use `String.toLowerCase(), `String.prototype.replace()`, com uma expressao regular apropriada
 * para remover caracteres desnecessarios, `String.prototype.split('')`, `Array.prototype.sort()`e `Array.prototype.join('')`
 * em ambas as string para normaliza-las, e entao cheque se a forma normalizada delas sao iguais.
 * @param {*} str1 
 * @param {*} str2 
 */
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

isAnagram('iceman', 'cinema'); // true

/**
 * Mediana
 * Retorna a mediana de uma colecao de numeros.
 * Acha o meio da colecao, use `Array.prototype.sort()`para sortear os valores.
 * Retorna o numero no meio se o comprimento é impar, se par, a media dos numeros do meio.
 * @param {*} arr 
 */
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

median([5, 6, 50, 1, -5]); // 5

/**
 * Ordernar por
 * Retorna uma colecao sorteada de objetos ordenada por propriedades e ordens.
 * Use `Array.prototype.sort()`, `Array.prototype.reduce()` na colecao `props` com um valor inicial de `0`,
 * desestruture a colecao para substituir as posicoes da propriedade dependendo na ordem passada.
 * Caso nenhuma colecao `orders` seja passada sorteie por `'asc'` como valor padrao. 
 * @param {*} arr 
 * @param {*} props 
 * @param {*} orders 
 */
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
orderBy(users, ['name', 'age'], ['asc', 'desc']); // [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']); // [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]

/**
 * Sortear caracteres em uma string alfabeticamente.
 * User o operador spread (`...`), `Array.prototype.sort()` e `String.localeCompare()` para sortear os caracteres
 * em `str`, recombina-los usando `String.prototype.join('')`.
 * @param {*} str 
 */
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');

sortCharactersInString('cabbage'); // 'aabbceg'

/**
 * Sorteio estavel
 * Performa sorteio estavel de uma colecao, preservando seus indexes iniciais dos itens quando seus valores sao o mesmo
 * Nao muta o valor original da colecao.
 * Use `Array.prototype.map()` para parear cada elemento de uma colecao input com seu index correspondente.
 * Use `Array.prototype.sort()` e uma funcao `compare` para sortear a lista, preservando sua ordem inicial caso 
 * os itens comparados sejam iguais.
 * @param {*} arr 
 * @param {*} compare 
 */
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
/**
 * Numeros maximos
 * Retorna os `n` maximos elementos a partir da colecao dada.
 * Caso `n`seja maior ou igual ao comprimento da colecao, retorna a colecao origina
 * Use `Array.prototype.sort()` combinado com o operador spread (`...`) para criar um clone da colecao
 * Sorteie em ordem descendente.
 * Use `Array.prototype.slice()` para obter o numero especificado de elementos.
 * Omitir o segundo argumento, `n`, para obter um elemento da colecao.
 * @param {*} arr
 * @param {*} n
 */
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3,2]

/**
 * Numeros minimos
 * Retorna os `n` minimos elementos a partir da colecao dada.
 * Caso `n`seja maior ou igual ao comprimento da colecao, retorna a colecao origina
 * Use `Array.prototype.sort()` combinado com o operador spread (`...`) para criar um clone da colecao
 * Sorteie em ordem ascendente.
 * Use `Array.prototype.slice()` para obter o numero especificado de elementos.
 * Omitir o segundo argumento, `n`, para obter um elemento da colecao.
 * @param {*} arr
 * @param {*} n
 */
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]
