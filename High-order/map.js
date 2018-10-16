// Map Definition & Syntax
// The map() method is used to apply a function on every element in an array. A new array is then returned.

/**
 * To Upper Case
 * Converts a given string to upper case
 * Example:
 * Input:  "How can mirrors be real if our eyes aren't real"
 * Output: "How Can Mirrors Be Real If Our Eyes Aren't Real"
 */
String.prototype.toUpperCase = function() {
  return this.split(' ').map(item => item[0].toUpperCase() + item.slice(1)).join(' ')
};
/**
 * distruibute evenly
 * Argument: ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four']
 * Result: ['one', 'two', 'three', 'four', 'one', 'two', 'three', 'four']
 * @param {*} array 
 */
const distributeEvenly = array => {
  const uniqueTypes = [...new Set(array)];
  const arrayOfTypes = uniqueTypes.map(outer =>
    array.filter(inner => outer === inner)
  );

  return array
    .map((item, i) => arrayOfTypes.map(el => el[i]))
    .reduce((a, b) => a.concat(b))
    .filter(_ => _);
};
/**
 * 2.00 - Media por
 * Retorna a media de uma colecao, apos mapear cada elemento a um valor usando a funcao dada
 * Use `Array.prototype.map()` para mapear cada elemento a um valor retornado por `fn`
 * Use `Array.prototype.reduce()` para adicionar cada valor a um acumulador, inicializado pelo valor `0`,
 * dividido pelo comprimento da colecao
 * @param {*} arr
 * @param {*} fn
 */

const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;

averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5

/**
 * 2.01 - Contar por
 * Agrupar elementos na colecao baseado na funcao dada e retornar a contagem de elementos em cada grupo.
 * Use `Array.prototype.map()` para mapear os valores da colecao a uma funcao ou nome da propriedade
 * Use `Array.prototype.reduce()` para criar um objeto, aonde as chaves sao produzidas a partir do resultados mapeados.
 * @param {*} arr
 * @param {*} fn
 */
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2} One element 'four', two elements 'six'. / Um elemento 'quatro' dois elementos 'seis'
countBy(["one", "two", "three"], "length"); // {3: 2, 5: 1} One element with 5 of length, two elements with 5 of length

/**
 * 2.02 - Agrupar por
 * Agrupar elementos em uma colecao baseado na funcao dada.
 * Use `Array.prototype.map()` para mapear valores de uma colecao a uma funcao ou nome de propriedade
 * Use `Array.prototype.reduce()`para criar um objeto, aonde as chaves sao produzidas a partir dos resultados mapeados.
 * @param {*} arr
 * @param {*} fn
 */
const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(["one", "two", "three"], "length"); // {3: ['one', 'two'], 5: ['three']}

/**
 * 2.04 - Conjunto de potencias
 * Retornar o conjunto de potencias de uma colecao de numeros
 * Use `Array.prototype.reduce()` combinado com `Array.prototype.map()` para iterar sobre os elementos
 * e combinar a uma colecao contendo todas as combinacoes
 * @param {*} arr
 */
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

powerset([1, 2]); // [[], [1], [2], [2, 1]]
/**
 * 2.05 - xProd
 * Criar uma nova colecao a partir das duas dadas, criar cada par possivel a partir das colecoes
 * Use `Arra.prototype.reduce()`, `Array.prototype.map()` e `Array.prototype.concat()` para produzir todos os possiveis pares
 * a partir dos elementos das duas colecoes e salva-las em uma colecao
 * @param {*} a
 * @param {*} b
 */
const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

xProd([1, 2], ["a", "b"]); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
/**
 * 8.01 - Permutas
 * ⚠️ **AVISO**: O tempo de execucao dessa funcao aumenta exponencialmente a cada caractere adicionado. Mais do que 8 a 10 caracteres ira fazer
 * o seu browser demorar mais e mais.
 * Gera todas as permutacoes de uma string (contem duplicatas).
 * Usa recursao
 * Para cada letra em uma string, cria todas as permutacoes parciais para o resto das letras.
 * Use `Array.prototype.map()` para combinar as letras com cada permuta parcial, e entao `Array.prototype.reduce()` para combinar todas as permutas em uma array.
 * Casos bases para o comprimento da string iguais a `2` ou `1`
 * @param {*} str
 */
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

stringPermutations("abc"); // ['abc','acb','bac','bca','cab','cba']

/**
 * 10.00 - Descompactar
 * Cria uma colecao de colecoes, desagrupando os elementos em uma colecao produzida por zip
 * Use `Math.max.apply()` para conseguir a maior sub-colecao na colecao, `Array.prototype.map()` para tornar cada elemento uma colecao.
 * Use `Array.prototype.reduce()` e `Array.prototype.forEach()` para mapear valores agrupados em colecoes individuais.
 * @param {*} arr
 */
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );

unzip([["a", 1, true], ["b", 2, false]]); //[['a', 'b'], [1, 2], [true, false]]
unzip([["a", 1, true], ["b", 2]]); //[['a', 'b'], [1, 2], [true]]

/**
 * Descompactar com
 * Cria uma colecao de elementos, desagrupando os elementos em uma colecao produzida por zip e aplicando a funcao dada.
 * Use `Math.max.apply()` para conseguir a maior sub-colecao na colecao, `Array.prototupe.map() para fazer cada elemento uma colecao.
 * Use `Array.prototype.reduce()` e `Array.prototype.forEach()` para mapear valores agrupados a colecoes individuais.
 * Use `Array.prototype.map()` e o operador spread (`...`) para aplicat `fn` para cada grupo individual de elementos.
 * @param {*} arr
 * @param {*} fn
 */
const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));

unzipWith([[1, 10, 100], [2, 20, 200]], (...args) =>
  args.reduce((acc, v) => acc + v, 0)
); // [3, 30, 300]
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

// ### factors

// Returns the array of factors of the given `num`.
// If the second argument is set to `true` returns only the prime factors of `num`.
// If `num` is `1` or `0` returns an empty array.
// If `num` is less than `0` returns all the factors of `-int` together with their additive inverses.

// Use `Array.from()`, `Array.prototype.map()` and `Array.prototype.filter()` to find all the factors of `num`.
// If given `num` is negative, use `Array.prototype.reduce()` to add the additive inverses to the array.
// Return all results if `primes` is `false`, else determine and return only the prime factors using `isPrime` and `Array.prototype.filter()`.
// Omit the second argument, `primes`, to return prime and non-prime factors by default.

// **Note**:- _Negative numbers are not considered prime._
/**
 * Fatores
 * Retorna a colecao de fatores de um numero.
 * Caso o segundo argumento é definido como `true`, retorna apenas os fatores primos.
 * Caso `num` é `1`ou `0` retorna uma colecao vazia
 * Caso `num` é menor que `0` retorna todos os fatores de `-int` junto com suas somas inversas.
 * Use `Array.prototype.filter()` para achar todos os fatores de `num`.
 * Caso `num` seja negativo, use `Array.prototype.reduce()` para adicionar somas inversas a colecao.
 * Retorna todos os resultados caso `primes` seja `false`, caso contrario determina e retorna apenas os fatores primos
 * usando `isPrime` `Array.prototype.filter()`
 * Omitir o segundo argumento `primes` para retornar primos e nao-primos como valor padrao.
 * @param {*} num
 * @param {*} primes
 */
const factors = (num, primes = false) => {
  const isPrime = num => {
    const boundary = Math.floor(Math.sqrt(num));
    for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
    return num >= 2;
  };
  const isNeg = num < 0;
  num = isNeg ? -num : num;
  let array = Array.from({ length: num - 1 })
    .map((val, i) => (num % (i + 2) === 0 ? i + 2 : false))
    .filter(val => val);
  if (isNeg)
    array = array.reduce((acc, val) => {
      acc.push(val);
      acc.push(-val);
      return acc;
    }, []);
  return primes ? array.filter(isPrime) : array;
};

factors(12); // [2,3,4,6,12]
factors(12, true); // [2,3]
factors(-12); // [2, -2, 3, -3, 4, -4, 6, -6, 12, -12]
factors(-12, true); // [2,3]

// ### digitize

// Converts a number to an array of digits.

// Convert the number to a string, using the spread operator (`...`) to build an array.
// Use `Array.prototype.map()` and `parseInt()` to transform each value to an integer.
/**
 * Digitizar
 * Converte um numero a uma colecao de digitos
 * Converte o numero a uma string, usando o operador spread (`...`) para montar a colecao.
 * Use `Array.prototype.map()` e `parseInt()` para transformar cada valor em uma integral.
 * @param {*} n
 */
const digitize = n => [...`${n}`].map(i => parseInt(i));

digitize(123); // [1, 2, 3]
// ### findLastIndex

// Returns the index of the last element for which the provided function returns a truthy value.

// Use `Array.prototype.map()` to map each element to an array with its index and value.
// Use `Array.prototype.filter()` to remove elements for which `fn` returns falsey values, `Array.prototype.pop()`
// to get the last one.

/**
 * Achar ultimo index
 * Retorna o index fo ultimo elemento para o queal a funcao providenciada retorna um valor verdadeiro(`truthy`).
 * Use `Array.prototype.map()` para mapear cada elemento a uma colecao com seu index e valor.
 * Use `Array.prototype.filter()` para remover elementos no qual `fn` retorna valores falsos(`falseys`)
 * `Array.prototype.pop()` para obter o ultimo.
 * @param {*} arr
 * @param {*} fn
 */
const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop()[0];

findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)

// ### formatDuration

// Returns the human readable format of the given number of milliseconds.

// Divide `ms` with the appropriate values to obtain the appropriate values for `day`, `hour`, `minute`, `second` and `millisecond`.
// Use `Object.entries()` with `Array.prototype.filter()` to keep only non-zero values.
// Use `Array.prototype.map()` to create the string for each value, pluralizing appropriately.
// Use `String.prototype.join(', ')` to combine the values into a string.

/**
 * Formatar duracao
 * Retorna valores que podem ser lidos por humanos do numero dado em milisegundos
 * Divide `ms` com o apropriado valor para obter os valores apropriados para
 * `day`(`dia`),`hour`(`hora`),`minute`(`minuto`),`second` (`segundo`) e `milisecond`(`milisegundo`)
 * Use `Object.entries()` com `Array.prototype.filter()` para manter apenas valores nao-nulos.
 * Use `Array.prototype.map()` para criar a string de cada valor, pluralizando apropriadamente.
 * Use `String.prototype.join(',')` para combinar os valores a uma string.
 * @param {*} ms
 */
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

// ### geometricProgression

// Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive
// and the ratio between two terms is `step`.
// Returns an error if `step` equals `1`.

// Use `Array.from()`, `Math.log()` and `Math.floor()` to create an array of the desired length,
//`Array.prototype.map()` to fill with the desired values in a range.
// Omit the second argument, `start`, to use a default value of `1`.
// Omit the third argument, `step`, to use a default value of `2`.

/**
 * Progressao geometrica
 * Inicializa uma colecao contendo apenas numeros na variacao aonde `start` e `end` sao inclusivos
 * e a proporcao entre eles é `step`
 * Retorna um erro caso `step` igual a `1`.
 * Use `Array.from()`, `Math.log()`e `Mathe.floor()`para criar uma colecao de comprimento desejado.
 * `Array.prototype.map()` para preencher com os valores de variacao desejados.
 * Omitir o segundo argumento, `start`, para usar o valor-padrao de `1`.
 * Omitir o terceiro argumento, `step`, para usar o valor-padrao de `2`.
 * @param {*} end
 * @param {*} start
 * @param {*} step
 */
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1
  }).map((v, i) => start * step ** i);

geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3); // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4); // [1, 4, 16, 64, 256]

// ### get

// Retrieve a set of properties indicated by the given selectors from an object.

// Use `Array.prototype.map()` for each selector, `String.prototype.replace()` to replace square brackets
//with dots, `String.prototype.split('.')` to split each selector, `Array.prototype.filter()` to remove empty
//values and `Array.prototype.reduce()` to get the value indicated by it.

/**
 * Receber
 * Recebe um conjunto de propriedades indicado por um seletor dado a partir de um objeto.
 * Use `Array.prototype.map()`para cada seletor, `String.prototype.replace()` para repor as chaves com pontos,
 * `String.prototype.split('.')` para dividir cada seletor, `Array.prototype.filter()`para remover valores vazios
 * `Array.prototype.reduce()`para obter o valor indicado
 * @param {*} from
 * @param  {...any} selectors
 */
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, ".$1.")
      .split(".")
      .filter(t => t !== "")
      .reduce((prev, cur) => prev && prev[cur], from)
  );

const obj = {
  selector: { to: { val: "val to select" } },
  target: [1, 2, { a: "test" }]
};
get(obj, "selector.to.val", "target[0]", "target[2].a"); // ['val to select', 1, 'test']

// ### getImages

// Fetches all images from within an element and puts them into an array

// Use `Element.prototype.getElementsByTagName()` to fetch all `<img>` elements inside the provided element,
//`Array.prototype.map()` to map every `src` attribute of their respective `<img>` element, then create a `Set`
// to eliminate duplicates and return the array.

/**
 * Receber imagens
 * Recebe todas as imagens a partir de um elemento e os coloca em uma colecao
 * Use `Element.prototype.getElementsByTagName()`para receber todos os elementos `<img>` dentro de um elemento dado
 * `Array.prototype.map()` para mapear cada atributo `src` do respectivo elemento `<img>` e entao criar um `Set`
 * para eliminar duplicatas e retornar uma colecao.
 * @param {*} el
 * @param {*} includeDuplicates
 */
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName("img")].map(img =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};

getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']

// ### initializeArrayWithRangeRight

// Initializes an array containing the numbers in the specified range (in reverse) where `start` and `end`
//are inclusive with their common difference `step`.

// Use `Array.from(Math.ceil((end+1-start)/step))` to create an array of the desired length(the amounts of
//elements is equal to `(end-start)/step` or `(end+1-start)/step` for inclusive end), `Array.prototype.map()`
//to fill with the desired values in a range.
// You can omit `start` to use a default value of `0`.
// You can omit `step` to use a default value of `1`.

/**
 * Inicializar com variacao a direita
 * Inicializa uma colecao contendo numeros na variacao especificada (em reverso) aonde `start` e `end` sao inclusivos
 * com a sua diferenca em comum `step`.
 * use `Array.from(Math.ceil(end+1-start)/step))` para criar uma colecao do desejado comprimento
 * (a quantidade de elementos é igual a `(end-start)/step` ou `(end+1-start)/step` para fim inclusivo),
 * `Array.prototype.map()` para preencher os valores desejados na variacao.
 * Omitir `start`para usar o valor padrao de `0`.
 * Omitir `step` para usar o valor padrao de `1`.
 * @param {*} end
 * @param {*} start
 * @param {*} step
 */
const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );

initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]

// ### initializeNDArray

// Create a n-dimensional array with given value.

// Use recursion.
// Use `Array.prototype.map()` to generate rows where each is a new array initialized using `initializeNDArray`.
/**
 * Inicializar colecao n-dimensional
 * Cria uma colecao n-dimensional a partir de um valor dado.
 * Usa recursao
 * Use `Array.prototype.map()` para gerar fileiras aonde cada uma eé uma nova colecao inicializada usando `initializeNDArray`.
 * @param {*} val
 * @param  {...any} args
 */
const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() =>
        initializeNDArray(val, ...args.slice(1))
      );

initializeNDArray(1, 3); // [1,1,1]
initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]

// ### mapString

// Creates a new string with the results of calling a provided function on every character in the calling string.

// Use `String.prototype.split('')` and `Array.prototype.map()` to call the provided function, `fn`, for each character in `str`.
// Use `Array.prototype.join('')` to recombine the array of characters into a string.
// The callback function, `fn`, takes three arguments (the current character, the index of the current character and the string `mapString` was called upon).
/**
 * Mapear string
 * Cria uma nova string com os resultados da funcao dada em cada caractere.
 * Use `String.prototype.split('')` e `Array.prototype.map()` para chamar a funcao dada, `fn`, para cada caractere em `str`
 * Use `Array.prototype.join('')` para recombinar a colecao de caracteres a uma string.
 * A funcao callback, `fn`, recebe tres argumentos (o caractere atual, o index do caractere atual e a string `mapString` chamada)
 * @param {*} str
 * @param {*} fn
 */
const mapString = (str, fn) =>
  str
    .split("")
    .map((c, i) => fn(c, i, str))
    .join("");

mapString("lorem ipsum", c => c.toUpperCase()); // 'LOREM IPSUM'

// ### maxBy

// Returns the maximum value of an array, after mapping each element to a value using the provided function.

// Use `Array.prototype.map()` to map each element to the value returned by `fn`, `Math.max()`
//to get the maximum value.
/**
 * Retorna o valor maximo de uma colecao, apos mapear cada elemento a um valor usando a funcao dada.
 * Use `Array.prototype.map()` para mapear cada elemento ao valor retornado por `fn`, `Math.max()`
 * para obter o valor maximo.
 * @param {*} arr
 * @param {*} fn
 */
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === "function" ? fn : val => val[fn]));

maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 8

// ### minBy

// Returns the minimum value of an array, after mapping each element to a value using the provided function.

// Use `Array.prototype.map()` to map each element to the value returned by `fn`, `Math.min()` to get the maximum value.
/**
 * Retorna o valor minimo de uma colecao, apos mapear cada elemento a um valor usando uma funcao dada.
 * Use `Array.prototype.map()` para mapear cada elemento ao valor retornado por `fn`
 * `Math.min()`para obter o valor minimo.
 * @param {*} arr
 * @param {*} fn
 */
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : val => val[fn]));

minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 2

// ### nest

// Given a flat array of objects linked to one another, it will nest them recursively.
// Useful for nesting comments, such as the ones on reddit.com.

// Use recursion.
// Use `Array.prototype.filter()` to filter the items where the `id` matches the `link`, then `Array.prototype.map()`
//to map each one to a new object that has a `children` property which recursively nests the items based on which
//ones are children of the current item.
// Omit the second argument, `id`, to default to `null` which indicates the object is not linked to another one (i.e. it is a top level object).
// Omit the third argument, `link`, to use `'parent_id'` as the default property which links the object to another one by its `id`.
/**
 * Aninhar
 * Dado uma colecao de objetos conectadas entre sim, ira aninha-los recursivamente.
 * Util para aninhar comentarios, como os que existem em reddit.com
 * Use recursao.
 * Use `Array.prototype.filter()` para filtrar itens aonde `id` combina com `link`, entao `Array.prototype.map()`
 * para mapear cada um a um novo objeto no qual possui uma propriedade `children` (filho) na qual aninha recursivamente
 * os itens baseados em quais sao filhos do atual item.
 * Omitir o segundo argumento, `id`, para obter o valor-padrao `null` no qual indica que o objeto nao estao conectado ao outro(p.ex. elemento top level)
 * Omitir o terceiro argumento, `link`, para usar `'parent_id'` como a propriedade padrao na qual conecta o objeto a um outro pelo seu `id`.
 * @param {*} items
 * @param {*} id
 * @param {*} link
 */
const nest = (items, id = null, link = "parent_id") =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));

// One top level comment
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]

// ### objectToPairs

// Use `Object.keys()` and `Array.prototype.map()` to iterate over the object's keys and produce an array with key-value pairs.

/**
 * Objeto a pares
 * Cria uma colecao de pares colecao valores-chave a partir de um objeto. // Creates an array of key-value pair arrays from an object.
 * Use `Object.keys()` e `Array.prototype.map()` para iterar sobre a chave do objeto e produzir uma colecao
 * com pares valor-chave
 * @param {*} obj
 */
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);

objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]

// ### over

// Creates a function that invokes each provided function with the arguments it receives and returns the results.

// Use `Array.prototype.map()` and `Function.prototype.apply()` to apply each function to the given arguments.
/**
 * Finalize
 * Cria uma funcao que invoca cada funcao dada com os argumentos que recebe e retorna seus resultados.
 * Use ``Array.prototype.map()` e `Function.prototype.apply()` para aplicar cada funcao para os argumentos dados.
 * @param  {...any} fns
 */
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1,5]

// ### overArgs

// Creates a function that invokes the provided function with its arguments transformed.

// Use `Array.prototype.map()` to apply `transforms` to `args` in combination with the spread operator (`...`)
//to pass the transformed arguments to `fn`.

/**
 * Cria uma funcao que invoca a funcao dada com seus argumentos transformados.
 * Use ``Array.prototype.map()` para aplicar `transforms` para `args em combincao com o operador spread (`...`)
 * para passar os argumentos transformados a `fn`.
 * @param {*} fn
 * @param {*} transforms
 */
const overArgs = (fn, transforms) => (...args) =>
  fn(...args.map((val, i) => transforms[i](val)));

const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
fn(9, 3); // [81, 6]
