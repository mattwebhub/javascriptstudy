
// #### Good to hear

// * Use `forEach()` if you need to iterate over an array and cause mutations to the elements without needing to return values to generate a new array.
// * `map()` is the right choice to keep data immutable where each value of the original array is mapped to a new array.

// ### What is the difference between the array methods `map()` and `forEach()`?

// #### Answer

// Both methods iterate through the elements of an array. `map()` maps each element to a new element by invoking the callback function on each element and returning a new array. 
// On the other hand, `forEach()` invokes the callback function for each element but does not return a new array. `forEach()` is generally used when causing a side effect on each iteration, whereas `map()` is a common functional programming technique.

/**
 * Clone
 * Cria um clone do objeto
 * Usa recursao
 * Use `Object.assign()`e `Array.prototype.forEach()`para determinar qual par valor-chave necessita ser clonado.
 * @param {*} obj 
 */
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj

/**
 * forEach direita
 * Executa a funcao providenciada uma vez para cada elemento na colecao, iniciando pelo ultimo elemento da colecao.
 * Use `Arra.yprototype.slice(0)` para clonar a colecao, `Array.prototype.reverse()`para reverter e 
 * `Array.prototype.forEach` para iterar sobre a colecao reversa.
 * @param {*} arr 
 * @param {*} callback 
 */
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);

forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

/**
 * Para o mesmo
 * Itera sobre todas as propriedades de um objeto, rodando uma callback para cada um.
 * Use `Object.keys(obj)` para obter todas as propriedade do objeto, 
 * `Array.prototype.forEach()` para rodar a funcao providenciada para cada par valor-chave.
 * A callback recebe tres argumentos - o valor, a chave e o objeto.
 * @param {*} obj 
 * @param {*} fn 
 */
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));

forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1


/**
 * Pelo o mesmo direita
 * Itera sobre todas as propriedades de um objeto, rodando uma callback para cada um.
 * Use `Object.keys(obj)` para obter todas as propriedade do objeto, 
 * `Array.prototype.reverse()` para reverter a ordem e 
 * `Array.prototype.forEach()` para rodar a funcao providenciada para cada par valor-chave.
 * A callback recebe tres argumentos - o valor, a chave e o objeto.
 * @param {*} obj 
 * @param {*} fn 
 */
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

/**
 * Esconder
 * Esconde todos os elementos especificados.
 * Use `NodeList.prototype.forEach()` para aplicar `display:none` para cada elemento especificado.
 * @param {*} els 
 */
const hide = els => els.forEach(e => (e.style.display = 'none'));

hide(document.querySelectorAll('img')); // Hides all <img> elements on the page

/**
 * Observar mutacoes
 * Retorna a `new MutationObserver` e roda a callback providenciada para cada mutacao no elemento especificado.
 * Use `MutationObserver` para observar mutacoes no dado elemento.
 * Use `Arra.yprototype.forEach()` para rodar a callback para cada mutacao que é observada.
 * Omite o terceiro argumento, `options`, para usar o valor-padrao 
 * @param {*} element 
 * @param {*} callback 
 * @param {*} options 
 */
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  );
  return observer;
};

const obs = observeMutations(document, console.log); // Logs all mutations that happen on the page
obs.disconnect(); // Disconnects the observer and stops logging mutations on the page

/**
 * Mostrar
 * Mostrar todos os elementos especificados.
 * Use o operador spread (`...`) e `Array.prototype.forEach()` para limpar a propriedade `display` para cada elemento 
 * especificado.
 * @param  {...any} el 
 */
const show = (...el) => [...el].forEach(e => (e.style.display = ''));

show(...document.querySelectorAll('img')); // Shows all <img> elements on the page

/**
 * Descompactar
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
