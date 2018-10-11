
/**
 * Separar
 * Separa uma colecao em partes menores a um tamanho especifico
 * Use `Array.from()` para criar uma array que encaixe no numero de pedacos que serao produzidos.
 * Use `Array.prototype.slice()` para mapear cada elemento da nova colecao a um pedaco de comprimento `size`.
 * Caso a colecao original nao pode ser separada igualmente, o pedaco final contera os elementos restantes.
 * @param {*} arr
 * @param {*} size
 */
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

/**
 * Verter
 * Retorna uma nova colecao com n elementos removidos da esquerda.
 * Use `Array.prototype.slice()` para dividir
 * @param {*} arr
 * @param {*} n
 */
const drop = (arr, n = 1) => arr.slice(n);

drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []

/**
 * Verter pela direita
 * Retorna uma nova colecao com n elementos removidos da direita.
 * Use `Array.prototype.slice`
 * @param {*} arr
 * @param {*} n
 */
const dropRight = (arr, n = 1) => arr.slice(0, -n);

dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []

/**
 * Verter ate (direita)
 * Lopp sobre uma colecao, usando `Array.prototype.slice()` para verter o ultimo elemento da colecao ate que o valor retornado
 * pela funcao dada seja verdadeiro.
 * Retorna os elementos restantes
 * @param {*} arr
 * @param {*} func
 */
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};

dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

/**
 * Verter ate
 * Remove elementos em uma colecao ate que a funcao dada retorne verdadeiro. Retorna os elementos restantes na colecao.
 * Loop sobre a colecao, usando `Array.prototype.slice()` para verter o primeiro elemento da colecao ate que o valor retornado da funcao dada
 * seja verdadeiro. Retorna os elementos restantes.
 * @param {*} arr
 * @param {*} func
 */
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]

/**
 * Extender hex
 * Extende codigo de cores de 3 digitos para 6 digitos
 * Use `Array.prototype.map()`, `String.prototype.split()`e `Array.prototype.join()` para juntar a colecao mapeada
 * para converter os 3-digitos RGB hexadecimal codigo-cor para forma de 6-digitos.
 * `Array.prototype.slice()` é usada para remover `#` da string.
 * @param {*} shortHex
 */
const extendHex = shortHex =>
  "#" +
  shortHex
    .slice(shortHex.startsWith("#") ? 1 : 0)
    .split("")
    .map(x => x + x)
    .join("");

extendHex("#03f"); // '#0033ff'
extendHex("05a"); // '#0055aa'

/**
 * Parametro de data
 * Retorna uma string na forma de `HH:MM:SS` a partir de um objeto `Date`.
 * Use `Date.prototype.toString()` e `String.prototype.slice()` para receber `HH:MM:SS` a partir de um objeto `Date`
 * @param {*} date
 */
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // "08:38:00"

/**
 * Mascarar
 * Substitui todos exceto o ultimo `num` dos caracteres com o caractere especifico.
 * Use `String.prototype.slice()` para pegar a porcao dos caracteres que irao ficar sem mascara
 * Use `String.padStart()` para preencher o inicio da string com a mascara de caractere ate o seu comprimento original.
 * Omite o segundo argumento, `num`, para manter o valor inicial de `4` caracteres sem mascara. Caso `num` seja negativo,
 * os caracteres sem mascara ficarao no inicio da string.
 * Omite o terceiro argumento, `mask`, para usar caractere inicial de `'*'` para a mascara.
 * @param {*} cc
 * @param {*} num
 * @param {*} mask
 */
const mask = (cc, num = 4, mask = "*") =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, "$"); // '$$$$567890'


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


/**
 * nthArg
 * Crie uma funcao que retorn o nth argumento de acordo com o index `n` dado.
 * Caso `n` seja negativo, retorne o nth argumento a partir do final.
 * Use `Array.prototype.slice()` para obter o argumento desejado ao index `n`
 * @param {*} n
 */
const nthArg = n => (...args) => args.slice(n)[0];

const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5


/**
 * Crie uma funcao que retorn o nth elemento de acordo com o index `n` dado.
 * Caso `n` seja negativo, retorne o nth elemento a partir do final.
 * Use `Array.prototype.slice()` para obter o elemento desejado ao index `n`
 * @param {*} arr
 * @param {*} n
 */
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];

nthElement(["a", "b", "c"], 1); // 'b'
nthElement(["a", "b", "b"], -3); // 'a'


/**
 * Compensar
 * Move a quantidade especifica de elementos para o final da colecao.
 * Use `Array.prototype.slice()` duas vezes para obter os elementos depois do index especificado e os elementos antes disso.
 * Use o operador spread (`...`) para combinar os dois em uma colecao.
 * Caso `offset` seja negatico, os elementos serao movidos do final para o inicio.
 * @param {*} arr
 * @param {*} offset
 */
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

/**
 * Misturar com
 * Obter `n` elementos aleatorios com chaves unicas a partir de uma colecao do tamanho de `array`
 * Misturar a colecao usando [Fisher-Yates algorithm](https://github.com/30-seconds/30-seconds-of-code#shuffle).
 * Use `Array.prototype.slice()` para obter os primeiros `n`elementos.
 * Omitir o segundo argumento, `n`, para obter um unico elemento aleatorio da colecao.
 * @param {*} param0
 * @param {*} n
 */
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]

/**
 * Shank
 * Possui a mesma funcionalidade de `Array.prototype.prototype.splice()`, porém retorna uma nova colecao ao inves de muta-la
 * Use `Array.prototype.slice()`, e `Array.prototype.concat()` para obter uma nova colecao com os novos conteudos depois de ter
 * removido os elementos existentes e/ou adicionado novos elementos.
 * Omitir o segundo argumento, `index`, para inicia-lo a `0`.
 * Omitir o terceiro argumento, `delCount`, remove `0` elementos
 * Omitir o quarto argumento, `elements`, para nao adicionar novos elementos
 * @param {*} arr
 * @param {*} index
 * @param {*} delCount
 * @param  {...any} elements
 */
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

const names = ["alpha", "bravo", "charlie"];
const namesAndDelta = shank(names, 1, 0, "delta"); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']


