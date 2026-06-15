'use strict';
/*
 * Kod rozbudowuje prototyp tablicy o nową metodę sortującą.
 * Algorytm implmenetowany jest rekurencyjnie
 */

function applyCustomSort() {
  // Dodanie domyślnego parametru, gdy użytkownik nie poda swojego.
  // Imitujemy domyślne zachowanie metody .sort()
  // sortowanie stringów z tablocy UTF - 16
  [].__proto__.sort2 = function (
    compareFunction = (a, b) => {
      const stringA = String(a);
      const stringB = String(b);

      if (stringA < stringB) {
        return -1;
      }

      if (stringA > stringB) {
        return 1;
      }

      return 0;
    },
  ) {
    const input = [...this];
    const result = [];

    // Warunek zatrzymania rekurencji
    const checkLength = () => {
      if (result.length !== this.length) {
        subSort();
      }
    };

    const subSort = () => {
      let lead = input[0];
      let index = 0;

      for (let i = 1; i < input.length; i++) {
        const current = input[i];

        // Ustawiamy kolejność elementów a,b w nowej tablicy
        if (compareFunction(current, lead) < 0) {
          lead = current;
          index = i;
        }
      }

      result.push(lead);
      input.splice(index, 1);
      checkLength();
    };

    subSort();

    // Modyfikacja tablicy wejściowej in-place
    for (let i = 0; i < result.length; i++) {
      this[i] = result[i];
    }

    return this;
  };
}

applyCustomSort();

module.exports = applyCustomSort;
