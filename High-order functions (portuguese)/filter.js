/**
 * O metodo filter() retorna uma nova colecao criada a partir de todos os elementos que passam dos parametros a uma nova colecao.
 * Olhe a sintaxe abaixo:
 */
let newArr = oldArr.filter(callback);

let newArray = oldArray.filter((currentElement, index, array, thisArg) => {});

/**
 * currentElement: o atual elemento sendo processado na colecao. (obrigatorio)
 * index: o index do atual elemento sendo processado na colecao. (opctional)
 * array: a colecao da qual filter() foi chamada. (opcional)
 * thisArg: valor a ser usado como this quando a callback for executada. (opcional)
 */

/**
 * Voce pode pensar como um for loop que especificamente filtra certos valores da colecao, veja abaixo:
 */
let arr = [1, 2, 3, 4, 5, 6];
let even = [];
for (var i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) even.push(arr[i]);
}
// even = [2,4,6]
/**
 * Utilizando o método filter para a mesma funcao...
 */
let even = arr.filter(val => {
  return val % 2 === 0;
});
// even = [2,4,6]

/**
 * Com a introducao das arrow functions, podemos simplificar a sintaxe acima ainda mais:
 */
let even = arr.filter(val => val % 2 === 0);

/**
 * Exemplos
 */

/**
 * Filtrar simples
 */
let data = [
  {
    country: "China",
    population: 1409517397
  },
  {
    country: "India",
    population: 1339180127
  },
  {
    country: "USA",
    population: 324459463
  },
  {
    country: "Indonesia",
    population: 263991379
  }
];

let cities = data.filter(val => val.population > 500000000);
// cities = [{country: "China", population: 1409517397},
//           {country: "India", population: 1339180127}]

/**r
 * X`s e O`s
 * Retorna `true` para caso o numero de X`s seja igual ao numero de O`s
 * @param {*} str
 */
const XO = str => {
  str = str.toLowerCase().split("");
  return (
    str.filter(x => x === "x").length === str.filter(x => x === "o").length
  );
};

/**
 * É isograma?
 */
const isIsogram = str =>
  str
    .toLowerCase()
    .split("")
    .filter((char, i, arr) => !arr.includes(char, i + 1)).length === str.length;

const isIsogram = str => str.length === [...new Set(str.toLowerCase())].length;
/**
 * Filtrar unicos
 * Filtra os valores nao unicos em uma colecao.
 * Use `Array.prototype.filter()` para uma colecao contendo apenas valores unicos.
 * @param {*} arr
 */
const filterNonUnique = arr =>
  arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

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
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]

/**
 * Achar ultimo
 * Retorna o ultimo elemento no qual a funcao dada retorna um valor verdadeiro (`truthy`)
 * Use `Array.prototype.filter()` para remover elementos dos quais `fn` retorna falseys.
 * `Array.prototype.pop()` para pegar o ultimo
 * @param {*} arr
 * @param {*} fn
 */
const findLast = (arr, fn) => arr.filter(fn).pop();

findLast([1, 2, 3, 4], n => n % 2 === 1); // 3

/**
 * Compactar
 * Remove valores falseys de uma colecao.
 * Use `Array.prototype.filter()` para filtrar falseys (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).
 * @param {*} arr
 */
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]); // [ 1, 2, 3, 'a', 's', 34 ]

/**
 * Intersecçaão
 * Retorna uma lista de elementos que existem em ambas as colecoes
 * Cria um `Set` a partir de `b`, entao usa `Array.prototype.filter()` em `a` para manter valores apenas em `b`.
 * @param {*} a
 * @param {*} b
 */
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

/**
 * Intersecção por
 * Retorna uma lista de elementos que existem em ambas as colecoes, depois de ter aplica a funcao dada a cada colecao.
 * Crie um `Set` aplicando `fn` a todos os elementos em `b`, entao use `Array.prototype.filter()` em `a` para manter elementos
 * que produzem valores contidos em `b`quando `fn` é aplicado a eles.
 * @param {*} a
 * @param {*} b
 * @param {*} fn
 */
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]

/**
 * Intersecçaão com
 * Retorna uma lista de elementos que existem nas colecoes, usando a funcao comparadora.
 * Use `Array.prototype.filter()` e `Array.prototype.findIndex()` em combinacao com a funcao comparadora para determinar valores presente em ambos.
 * @param {*} a
 * @param {*} b
 * @param {*} comp
 */
const intersectionWith = (a, b, comp) =>
  a.filter(x => b.findIndex(y => comp(x, y)) !== -1);

intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1.5, 3, 0]

/**
 * Similaridade
 * Retorna uma colecao de elementos que aparecem e ambas colecoes.
 * Use `Array.prototype.filter()` para remover valores que nao sao parte de `values`, determinados usando `Array.prototype.includes()`.
 * @param {*} arr
 * @param {*} values
 */
const similarity = (arr, values) => arr.filter(v => values.includes(v));

similarity([1, 2, 3], [1, 2, 4]); // [1, 2]

/**
 * Diferenca simetrica
 * Retorna a diferenca simetrica entre duas colecoes, sem filtrar valores duplicados.
 * Crie um `Set`a partir de cada colecao, e entao use `Array.prototype.filter()` em cada uma delas para apenas manter valores
 * que nao estao contidos em cada um
 * @param {*} a
 * @param {*} b
 */
const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]

/**
 * Sem
 * Filtra elementos de uma colecao, que possui um dos valores especificados.
 * Use `Array.prototype.filter()` para criar uma colecao excluindo (usando `!Array.includes()`) todos os valores dados.
 * @param {*} arr
 * @param  {...any} args
 */
const without = (arr, ...args) => arr.filter(v => !args.includes(v));

without([2, 1, 2, 3], 1, 2); // [3]

/**
 * Palavras
 * Converte uma string em uma colecao de palavras.
 * Use `String.prototype.split()` com o padrao dado para converter a uma colecao de strings.
 * Use `Array.prototype.filter()` para remover strings vazias.
 * @param {*} str
 * @param {*} pattern
 */
const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);

words("I love javaScript!!"); // ["I", "love", "javaScript"]
words("python, javaScript & coffee"); // ["python", "javaScript", "coffee"]

/**
 * Retorna a diferenca simetrica entre duas colecoes, depois de ter aplicado a funcao dada a cada uma das colecoes.
 * Crie `Set` ao aplicar `fn` para cada elemento na colecao, entao use `Array.prototype.filter()` em cada uma delas para manter os valores que nao aparecem no outro.
 * @param {*} a
 * @param {*} b
 * @param {*} fn
 */
const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]

/**
 * Diferenca simetrica com
 * Retorna a diferenca simetrica entre duas colecoes, usando a funcao dada como comparadora.
 * Use `Array.prototype.filter()` e `Array.prototype.findIndex()` para achar o valor apropriado.
 * @param {*} arr
 * @param {*} val
 * @param {*} comp
 */
const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];

symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]

/**
 * Diferenca simetrica unica
 * Retorna a diferenca simetrica unica entre duas colecoes, nao contendo valores duplicados de cada colecao.
 * Use `Array.prototype.filter()` e `Array.prototype.includes()` em cada colecao para remover valores contidos em cadam
 * Entao crie um `Set` a partir dos resultados, removendo valores duplicados.
 * @param {*} a
 * @param {*} b
 */
const uniqueSymmetricDifference = (a, b) => [
  ...new Set([
    ...a.filter(v => !b.includes(v)),
    ...b.filter(v => !a.includes(v))
  ])
];

uniqueSymmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
uniqueSymmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 3]

/**
 * Rejeitar
 * Recebe um predicado e uma colecao, como em `Array.prototype.filter()`, mas apenas mantem `x` caso `pred(x) === false`.
 * @param {*} pred
 * @param {*} array
 */
const reject = (pred, array) => array.filter((...args) => !pred(...args));

reject(x => x % 2 === 0, [1, 2, 3, 4, 5]); // [1, 3, 5]
reject(word => word.length > 4, ["Apple", "Pear", "Kiwi", "Banana"]); // ['Pear', 'Kiwi']

/**
 * Diferenca
 * Retorna a diferenca entre duas colecoes.
 * Crie um `Set` a partir de `b`, entao use `Array.prototype.filter()` em `a` para manter apenas valores nao contidos em `b`.
 * @param {*} a
 * @param {*} b
 */
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

difference([1, 2, 3], [1, 2, 4]); // [3]

/**
 * Diferenca por
 * Retorna a diferenca entre duas colecoes, apos aplicar a funcao dada em cada colecao
 * Crie um `Set` aplicando `fn` a cada elemento em `b`, entao use `Array.prototype.filter()` em combinacao com `fn`em à`para mantes apenas valores nao contidos
 * no set criado previamente.
 * @param {*} a
 * @param {*} b
 * @param {*} fn
 */
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(x => !s.has(fn(x)));
};

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]

/**
 * Diferenca com
 * Filtra todos os valores de uma colecao na qual a funcao comparadora nao retorna `true`.
 * Use `Array.prototype.filter()` e `Array.prototype.findIndex()` para achar os valores apropriados.
 * @param {*} arr
 * @param {*} val
 * @param {*} comp
 */
const differenceWith = (arr, val, comp) =>
  arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2]

/**
 * Retorna o nth elemento em uma colecao.
 * Use `Array.prototype.filter()` para criar uma nova colecao que contenha cada nth elemento de uma colecao dada.
 * @param {*} arr
 * @param {*} nth
 */
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]

/**
 * Omitir por
 * Cria um objeto composto pelas propriedades da funcao dada se retorna falso. A funcao é chamada com dois argumentos: valor e chave.
 * Use `Object.keys(obj)` e `Array.prototype.filter()` para remover as chaves no qual `fn` retorna um valor verdadeiro.
 * Use `Array.prototype.reduce()` para converter as chaves fitlradas de volta ao objeto com os pares valores-chave correspondentes.
 * @param {*} obj
 * @param {*} fn
 */
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

omitBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { b: '2' }

/**
 * Escolher por
 * Cria um objeto composto pelas propriedades da funcao dada caso retorne verdadeiro. A funcao é chamada com dois argumentos (value, key)
 * Use `Object.keys(obj)` e `Array.prototype.filter()` para remover as chaves na qual `fn` retorna um valor falso.
 * Use `Array.prototype.reduce()` para converter os valores chaves filtrados de volta para o objeto com os pares valores-chave correspondentes.
 * @param {*} obj
 * @param {*} fn
 */
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

pickBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { 'a': 1, 'c': 3 }

/**
 * Reduce filter map
 */
/**
 * Filtro reduzido
 * Filtra uma colecao de objetos com uma certa condicao enquanto filtra chaves nao especificadas.
 * Use `Array.prototype.filter()` para filtrar a colecao baseada no predicado `fn` para que retorne os objetos no qual a condicao retornou um valor verdadeiro
 * Na colecao filtrada, use `Array.prototype.map` para retornar o novo objeto usando `Array.prototype.reduce()` para filtrar as chaves na qual nao foram dadas como argumento de `keys`.
 * @param {*} data
 * @param {*} keys
 * @param {*} fn
 */
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const data = [
  {
    id: 1,
    name: "john",
    age: 24
  },
  {
    id: 2,
    name: "mike",
    age: 50
  }
];

reducedFilter(data, ["id", "name"], item => item.age > 24); // [{ id: 2, name: 'mike'}]

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
