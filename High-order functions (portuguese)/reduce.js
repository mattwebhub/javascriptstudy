/**
 * Definição:
 * A utilidade reduce (tambem conhecido com `acumulado`), comumente é usado na programação funcional e permite que voce
 * itere entre os elementos de uma lista, aplicando a funçao a um valor acumulado e o proximo valor na list, até que a iteracao
 * seja completa e o valor retornado. Muitas coisas uteis podem ser feitas com reduce.
 * Frequentemente, é a forma mais elegante para se realizar processamento não-trivial em uma coleçaão de itens.
 */
`array.reduce(
    reducer: (accumulator: Any, current: Any) => Any,
    initialValue: Any
  ) => accumulator: Any
 `;
/**
 * Vamos realizar uma soma:
 */

const total = [0, 1, 2, 3].reduce((sum, value) => sum + value, 1);
// Total é 7

/**
 * Para cada elemento na coleçao, o `reducer` é chamado e passa um `acumulador` e o seu valor atual.
 * O trabalho do reducer é `cruzar` o atual valor em um valor acumulado de alguma forma.
 * `Como` não é especificado e especificar o `como` é trabalho da função reducer.
 * O `reducer` retorna o novo valor acumulado e reduce() move para o proximo valor na coleção.
 * O `reducer` pode precisar de um valor inicial para começar, então, muitas implementações pegam um valor inicial como parametro.
 */
/**
 * No exemplo acima, a primeira vez que reducer é chamado, `acc` inicia com valor inicial `1` (o valor que passamos como segundo parametro)
 * O reducer retorna 1 + 0 (0 foi o primeiro elemento na coleçaão), resultando em 1.
 * Para a proxima chamada, acc = 1, n = 1 e o reducer retorna o resultado de 1 + 1 (2).
 * Na proxima iteracao, acc = 4, n = 3, e reducer retorna 7. Como a iteracao acabou, .reduce() retorna o valor final acumulado, 7.
 */
/**
 * O que pude perceber acontecendo com desenvolvedores e reduce, é que eles não precisam somar algum numero, então eles esquecem
 * que reduce existe, ou eles só lembram que reduce existe quando eles precisam somar alguns numeros.
 * Reduce pode fazer muito mais que isso como voce vera nos exemplos a seguir
 */
/**
 * Uma palavrinha sobre REDUX
 * Redux, para quem não conhece é uma importante biblioteca para controlar o estado de sua aplicacao, nao irei entrar muito em detalhes
 * porem os reducers, sao apenas uma aplicacao do reducer() e voce pode plugar em quanquer implementacao `reduce()`
 * Isso significa que voce pode criar uma colecao de objeto de acoes e reduzi-las para conseguir um `snapshot` do que seria
 * se voce estivesse despachando tais acoes para sua store. Leia mais sobre isso aqui:
 * https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux/
 * https://medium.com/@thejasonfile/the-redux-reducers-and-reduce-puzzle-ecc935191fbf
 * https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d (antes da conclusao)
 */

/**
 * Como voce esta para ver nos proximos exemplos, nos podemos misturar outras funçoes como `map()`, `filter()`, `forEach()`, `Promises`
 * e muito mais! Eu agrupei os proximos exemplos do repositorio `30-seconds of code` no github e separei-os por tipo,
 * se usa map, filter, forEach, ou todos rsrs, tente ver se voce consegue entender o codigo sem olhar na descricao, alem disso,
 * tentei agrupa-los em ordem de dificuldade, para que seja progressivo, se voce é que nem eu que só consegue entender conceitos
 * a partir de exemplos, voce vai pegar bem rapido!
 */

/**
 * Exemplos
 */

/**
 * 1 - Apenas reduce()
 */

/**
 * 1.00 - Média
 * Retorna a média de dois ou mais numeros.
 * Use `Array.prototype.reduce()` para adicionar valores ao acumulador,
 * inicializado pelo valor 0 e dividido pela `length`(comprimento)
 * @param  {...any} nums
 */
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

/**
 * 1.01 - Multiplicar elementos
 * Multiplique elementos na array
 * obs: Aqui nao queremos passar o valor inicial 0
 * @param  {...any} nums
 */
const multiply = (...nums) => nums.reduce((acc, val) => acc * val, 1);

/**
 * 1.02 - Contar ocorrencias
 * Dada uma coleção e um valor, conta as ocorrencias desse valor.
 * Use `Array.prototype.reduc()` para incrementar o contador cada vez que voce encontrar um especifico valor dentro da coleção.
 * @param {*} arr
 * @param {*} val
 */
const countOccurrences = (arr, val) =>
  arr.reduce((acc, v) => (v === val ? acc + 1 : acc), 0);

countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

/**
 * 1.03 - Maior item
 * Pega qualquer numero dentre objetos iteraveis ou objetos com uma propriedade `comprimento` (`length`) e retorna o maior
 * Caso multiplos objetos possuem o mesmo comprimento, o primeiro será retornado.
 * Retorna `undefined` caso nenhum argumento seja dado
 * Use `Arra.prototype.reduce()`, comparando o comprimento dos objetos para achar o maior
 * @param {*} val
 * @param  {...any} vals
 */
const longestItem = (val, ...vals) =>
  [val, ...vals].reduce((a, x) => (x.length > a.length ? x : a));

longestItem("this", "is", "a", "testcase"); // 'testcase'
longestItem(...["a", "ab", "abc"]); // 'abc'
longestItem(...["a", "ab", "abc"], "abcd"); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], "foobar"); // 'foobar'

/**
 * 1.04 - Indexar elementos 
 * Retorna todos os indices de um valor (`val`) em uma coleção
 * Caso `val` nunca aconteca, retornar `[]`
 * Use `Array.prototype.reduce()` para iterar entre elementos e registrar os indices para os elementos que combinam.
 * Retornar uma coleção de indices.
 * @param {*} arr
 * @param {*} val
 */
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
/**
 * 1.05 - M.D.C
 * Calcular o maior divisor comum (m.d.c) entre dois ou mais numeros/colecoes.
 * A funcao de dentro `_mdc` usa recursao
 * Caso basico é quando `y` igual a `0`, nesse caso, retorne `x`.
 * Caso contrario, retorne o MDC de `y` e o restante da divisao `x/y`
 * @param  {...any} arr
 */
const mdc = (...arr) => {
  const _mdc = (x, y) => (!y ? x : mdc(y, x % y));
  return [...arr].reduce((a, b) => _mdc(a, b));
};

mdc(8, 36); // 4
mdc(...[12, 8, 32]); // 4

/**
 * 1.06 - M.M.C
 * Retorna o minimo multiplo comum (m.m.c) entre dois numeros ou mais
 * Use a formula do maior divisor comum (m.d.c) e o fato que `mmc(x,y) = x * y / mdc(x,y)` para determinar o m.m.c
 * A formula do MDC usa recursao
 * @param  {...any} arr
 */
const mmc = (...arr) => {
  const mdc = (x, y) => (!y ? x : mdc(y, x % y));
  const _mmc = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _mmc(a, b));
};

mmc(12, 7); // 84
mmc(...[1, 3, 4, 5]); // 60

/**
 * 1.07 - Porcentagem de iguais ou maiores
 * Use a formula da porcentagem para calcular quantos numeros em uma certa colecao sao iguais ou menores ao valor dado
 * Use `Array.prototype.reduce()` para calcular quantos numeros estao abaixo do valor e quantos sao do mesmo valor
 * e aplique a formula da porcentagem.
 * @param {*} arr
 * @param {*} val
 */
const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55
/**
 * 1.08 - Relacionar
 * Dada uma coleção de validos identificadores de propriedade e uma coleção de valores,
 * retornar um objeto associando as propriedades aos valores.
 * Como um objeto pode ter valores indefinidos mas nao pode ter propriedades indefinidas,
 * a colecao de propriedades é usada para decidir a estrutura do objeto resultante usando `Array.prototype.reduce()`
 * @param {*} props
 * @param {*} values
 */
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

zipObject(["a", "b", "c"], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(["a", "b"], [1, 2, 3]); // {a: 1, b: 2}

/**
 *  1.09 - Escolher
 *  Pega um par valor-chave correspondente as chaves dadas pelo objeto.
 *  use `Array.prototype.reduce()` para converter as chaves escolhidas de volta a um objeto com o correspondente par valor-chave
 *  caso a chave exista no objeto
 * @param {*} obj
 * @param {*} arr
 */
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

pick({ a: 1, b: "2", c: 3 }, ["a", "c"]); // { 'a': 1, 'c': 3 }

/**
 * 1.10 - Padrão similar 
 * Determine se o padrao existe dentre `str`
 * Use `String.toLowerCase()`para converter strings para letra minuscula, entao itere entre `str` 
 * e determine se contem todos os caracteres do `padrao`(`pattern`) e na ordem correta
 * @param {*} pattern
 * @param {*} str
 */
const isSimilar = (pattern, str) =>
  [...str].reduce(
    (matchIndex, char) =>
      char.toLowerCase() === (pattern[matchIndex] || "").toLowerCase()
        ? matchIndex + 1
        : matchIndex,
    0
  ) === pattern.length;

isSimilar("rt", "Rohit"); // true
isSimilar("tr", "Rohit"); // false

/**
 * 1.11 - Minimo ou máximo
 * Retorna o valor minimo ou maximo em uma coleção, depois de aplicar a função providenciada que define a regra de comparacao
 * Use `Array.prototype.reduce()` em combinacao com a funcao `comparator` para resultar no elemento desejado na colecao
 * Voce pode omitir o segundo parametro, `comaprator`, para usar o valor padraoque retorna o valor minimo na colecao
 * @param {*} arr
 * @param {*} comparator
 */
const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));

reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [
    { name: "Tom", age: 12 },
    { name: "Jack", age: 18 },
    { name: "Lucy", age: 9 }
  ],
  (a, b) => a.age - b.age
); // {name: "Lucy", age: 9}

/**
 * 1.12 - Transformar
 * Aplique uma funcao contra um acumulador e cada chave no objeto (da esquerda para direita)
 * Use `Object.keys(obj)` para iterar sobre cada chave no objeto, `Array.prototype.reduce()`
 * para aplicar a funcao especifica sobre o acumulador
 * @param {*} obj
 * @param {*} fn
 * @param {*} acc
 */
const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }

/**
 * 1.13 - Chaves minusculas
 * Cria um novo objeto a partir de um dado, aonde todas as chaves sao minusculas.
 * Use `Objetc.keys()` e `Array.prototype.reduce()` para criar o novo objeto a partir do especificado.
 * Converta cada chave no objeto original para minuscula, usando `String.toLowerCase()`.
 * @param {*} obj
 */
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

const myObj = { Name: "Adam", sUrnAME: "Smith" };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};

/**
 * 1.14 - Renomear chaves
 * Substitua o nome das chaves dos objetos com os valores dados.
 * Use `Object.keys()`em combinacao com `Array.prototype.reduce()`
 * e o operador `spread`(`...`) para obter as chaves dos objetos e renomea-los de acordo com `keysMap`
 * @param {*} keysMap
 * @param {*} obj
 */
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const obj = { name: "Bobo", job: "Front-End Master", shoeSize: 100 };
renameKeys({ name: "firstName", job: "passion" }, obj); // { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }

/**
 * 1.15 - Recriar chaves
 * Criar um objeto com as chaves geradas pela funcao dada para cada chave e mesmo valor ao objeto dado
 * Use `Object.keys(obj)` para iterar sobre as chaves do objeto
 * Use `Array.prototype.reduce()` para criar um novo objeto com os mesmos valores e chaves mapeadas por `fn`
 * @param {*} obj
 * @param {*} fn
 */
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

/**
 * 1.16 - Compor funções
 * Realizar composicoes de operacoes esquerda-para-direita
 * Use `Array.prototype.reduce()` com o operador `spread`(`...`) para realizar composicoes de funcao esquerda-para-direita
 * A primeira (mais a esquerda) funcao pode aceitar um ou mais argumentos, o resto das funcoes podem ser unarias
 * @param  {...any} fns
 */
const pipeFunctions = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15

/**
 * 1.17 - Mapear valores
 * Criar um objeto com as mesmas chaves do objeto dado e valores gerados ao rodar a funcao dada por cada valor.
 * Use `Objetct.keys(obj)` para iterar sobre as chaves do objeto
 * Use `Array.prototype.reduce()` para criar um novo objeto com as mesmas chaves e valores mapeados usando `fn`
 * @param {*} obj
 * @param {*} fn
 */
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

const users = {
  fred: { user: "fred", age: 40 },
  pebbles: { user: "pebbles", age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }

/**
 * 1.18 - Juntar
 * Juntar todos os elementos de uma colecao a uma string e retornar essa string
 * Usar um separador e um separador final
 * Use `Array.prototype.reduce()`para combinar elementos a uma string
 * Omitir o segundo argumento, `separator`, para usar o separador inicial `','`.
 * Omitir o terceiro argumento, `end`, para usar o mesmo valor `separator` inicial.
 * @param {*} arr
 * @param {*} separator
 * @param {*} end
 */
const join = (arr, separator = ",", end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ""
  );

join(["pen", "pineapple", "apple", "pen"], ",", "&"); // "pen,pineapple,apple&pen"
join(["pen", "pineapple", "apple", "pen"], ","); // "pen,pineapple,apple,pen"
join(["pen", "pineapple", "apple", "pen"]); // "pen,pineapple,apple,pen"

/**
 * 1.19 - Hash
 * 'Hashear' a entrada string a um numero.
 * Use `String.prototype.split('')` e `Array.prototype.reduce()` para criar a hash da entrada string, utilizando bit shifting.
 * @param {*} str
 */
const sdbm = str => {
  let arr = str.split("");
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};
sdbm("name"); // -3521204949

/**
 * Reduce and map
 */

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
 * 2.03 - Mapear objeto por
 * Mapear os valores de uma colecao a um objeto usanfo uma funcao
 * Aonde os pares de chave-valor consistem do valor original à chave e o valor mapeado
 * Use uma funcao interna anonima para declarar um espaco de memoria indefinido
 * use closures para armazenar o valor retornado.
 * Use uma colecao nova para armazenar a colecao com o mapeamento da funcao sobre o seus dados e um operador virgula para retornar
 * o segundo passo, sem a necessidade de mover um contexto para outro (em consequencia das closures e ordem das operacoes)
 * @param {*} arr
 * @param {*} fn
 */
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]),
    a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();

const squareIt = arr => mapObject(arr, a => a * a);

squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }


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

// ### sumBy

// Returns the sum of an array, after mapping each element to a value using the provided function.

// Use `Array.prototype.map()` to map each element to the value returned by `fn`, `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
/**
 * Somar por 
 * Retorna a some de uma colecao, apos mapear cada elemento a um valor usando a funcao dada
 * Use `Array.prototype.map()` para mapear cada elemento ao seu valor retornado por `fn`
 * Use `Array.prototype.reduce()` para adicionar o valor acumulado, inicializado por um valor 0 
 * @param {*} arr 
 * @param {*} fn 
 */
const sumBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0);

sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20

/**
 * Reduce and concat
 */
/**
 * 3.00 - Fibonacci
 * Criar uma colecao vazia com o comprimento especificado, inicializando os primeiros dois valores (`0` e `1`).
 * Use `Array.prototype.reduce()` para adicionar valores a colecao, usando a some dos ultimos dois valores,
 * exceto para os primeiros dois
 * @param {*} n
 */
const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

fibonacci(6); // [0, 1, 1, 2, 3, 5]



/**
 * 3.01 - Desvio padrão
 * Retornar o desvio padrao de uma colecao de numeros
 * Use `Array.prototype.reduce()` para calcular a media (`mean`), variancia e a soma da variancia dos valores, a variancia dos valores
 * e entao determinar o desvio padrao
 * Voce pode omitir o segundo argumento para conseguir o desvio padrao simples 
 * ou defini-lo `true` para conseguir o desvio populacional padrao
 * @param {*} arr
 * @param {*} usePopulation
 */
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true); // 12.29899614287479 (population)

/**
 * 3.02 - Achatar
 * Achata uma colecao ate a profundidade especificada.
 * Usa recursao, decrementando `depth` (`profundidade`) por 1 para cada nivel de profundidade.
 * Use `Array.prototype.reduce()` e `Array.rptotype.concat()` para mesclar elementos ou colecoes.
 * Caso base, para `depth` igual a `1` para recursao.
 * Omitir o segundo argumento, `profundidade` para achatar a um nivel de `1` (Achate unico)
 * @param {*} arr
 * @param {*} depth
 */
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

/**
 * 3.03 - Fundir
 * Criar um novo objeto a partir da combinacao de dois ou mais objetos.
 * Use `Array.prototype.reduce()` combinado com `Object.keys(obj)` para iterar sobre todos os objetos e chaves.
 * Use `hasOwnProperty()` e `Array.prototype.concat()` para acrescentar valores para chaves existentes em multiplos objetos.
 * @param  {...any} objs
 */
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: "foo"
};
merge(object, other); // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
/**
 * Reduce, filter, push
 */

/**
 * 4.01 - Inverter valores de chaves
 * Inverte os pares de valor chave de um objeto, sem muta-los. O correspondente valor invertido de cada chave invertida é uma colecao de chaves responsaveis por gerar
 * o valor invertido. Se uma funcao é dada, é aplicada a cada chave invertida.
 * Use `Object.keys()` e `Array.prototype.reduce()` para inverter os pares valor-chave de um objeto e aplica-los a funcao dada (caso seja dada).
 * Omitir o segundo argumento, `fn`, para ter as chaves invertidas sem aplicar a funcao a eles.
 * @param {*} obj
 * @param {*} fn
 */
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => "group" + value); // { group1: [ 'a', 'c' ], group2: [ 'b' ] }

/**
 * 4.02 - Partição
 * Agrupa elementos em duas colecoes, dependendo da funcao providenciada se falso ou verdadeiro para cada elemento.
 * Use `Array.prototype.reduce()` para criar uma colecao de duas colecoes.
 * Use `Array.prototype.push` para adicionar elementos para os quais `fn` retorne `true` para a primeira colecao e elementos dos quais `fn`retorne `false` para o segundo.
 * @param {*} arr
 * @param {*} fn
 */
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true }
];
partition(users, o => o.active); // [[{ 'user': 'fred', 'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]

/**
 * Reduce, filter
 */

/**
 * 5.00 - Omitir por
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
 * 5.01 - Escolher por
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
 * 6.00 - Filtro reduzido
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
 * Reduce and slice
 */
/**
 * 7.00 - Reduções sucessivas
 * Aplica uma funcao contra um acumulador e cada elemento de uma colecao (da esquerda para direita),
 * retorna uma colecao de valores sucessivamente reduzidos.
 * Use `Array.prototype.reduce()` para aplicar a funcao dada na colecao dada, armazenando cada novo resultado. 
 * @param {*} arr
 * @param {*} fn
 * @param {*} acc
 */
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce(
    (res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res),
    [acc]
  );

reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0); // [0, 1, 3, 6, 10, 15, 21]

/**
 * 7.01 - Uncurries uma funcao ate a profundidade `n`. // Nao sei o que significa Uncurry nem consegui achar uma traducao para tal
 * Retorna uma funcao variadica.
 * Usa `Array.prototype.reduce()` nos argumentos dados para chamar cada subsequente curry level na funcao.
 * Caso o comprimento do argumento dado seja menor que `n` acusar erro.
 * Caso contrario, chama `fn` com a quantidade de argumentos correta, usando `Array.prototype.slice(0, n)`. Omitir o segundo argumento, 
 * o nivel de profundidade sera `1`.
 * @param {*} fn
 * @param {*} n
 */
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError("Arguments too few!");
  return next(fn)(args.slice(0, n));
};

const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6

/**
 * Reduce filter, splice and/or slice
 */

/**
 * 8.00 - Função remover
 * Remove elementos da colecao na qual a funcao dada retorna `falso`.
 * Use `Array.prototype.filter()` para achar elementos na colecao que retornem verdadeiro e `Array.prototype.reduce()` para remover elementos usando `Array.prototype.splice()`.
 * A `func`é chamada com 3 argumentos (`value, index, array`).
 * @param {*} arr
 * @param {*} func
 */
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

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
 * Reduce, some
 */
/**
 * 9.00 - Elementos unicos por
 * Retorna todos os valores unicos de uma colecao, baseado na funcao de comparacao dada.
 * Use `Array.prototype.reduce()` e `Array.prototype.some()` para uma colecao contendo apenas a primeira ocorrencia unica de cada valor,
 * baseado na funcao comparacao `fn`.
 * A funcao comparacao recebe dois argumentos: os valores de dois elementos sendo comparados.
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
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]

/**
 * 9.01 - Elementos unicos pela direita
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
/**
 * Reduce forEach map
 */

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
 * Reduce and Promises
 */

/**
 * Promises em series
 * Roda promises em series
 * Use `Array.prototype.reduce()` para criar uma cadeia de promises, aonde cada promise retorna a proxima proxima quando resolvida.
 * @param {*} ps
 */
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // Executes each promise sequentially, taking a total of 3 seconds to complete

/**
 * Tubular funcoes
 * Realiza funcoes esquerda-para-direita, composicoes para funcoes asincronas.
 * Use `Arra.yprototype.reduce()` com o spread operator (`...`) para realizar composicoes de funcao esquerda-para-direita usando `Promise.then()`.
 * As funcoes podem retornar uma combinacao de: valores simples, `Promises` ou elas podem ser definidas como `asyncs` retornando-as a partir de await.
 * Todas as funcoes devem ser unarias.
 * @param  {...any} fns
 */
const pipeAsyncFunctions = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
