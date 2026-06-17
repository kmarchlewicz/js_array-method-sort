'use strict';

function applyCustomSort() {
  // Rozszerzamy prototyp o własną metodę sortującą
  [].__proto__.sort2 = function (
    // Dodanie domyślnego parametru, gdy użytkownik nie poda swojego.
    // Imitujemy domyślne zachowanie metody .sort
    // tj. sortowanie stringów z tablicy UTF - 16
    compareFunction = (a, b) => {
      const stringA = String(a);
      const stringB = String(b);

      return stringA < stringB ? -1 : stringA > stringB ? 1 : 0;
    },
  ) {
    // licznik tur. Przesuwa obszar zainteresowania
    // poza elementy już posortowane
    let count = 0;

    // Warunek zatrzymania rekurencji
    const checkLength = () => {
      if (count !== this.length) {
        subSort();
      }
    };

    const subSort = () => {
      let lead = this[count];
      let index = 0;

      for (let i = 1; i < this.length - count; i++) {
        const current = this[i + count];

        // Ustawiamy kolejność elementów
        // jeżeli wynik jest mniejszy od 0,
        // to current w tablicy ma być wcześniej niż lead
        if (compareFunction(current, lead) < 0) {
          lead = current;
          index = i;
        }
      }

      // Manipulacja elementami tablicy in-place
      this.splice(index + count, 1); // usuwamy znalezionego lidera
      // dodajemy lidera w miejscu za dotychczas posortowanymi elementami
      this.splice(count, 0, lead);
      count++;
      checkLength();
    };

    subSort();

    return this;
  };
}

applyCustomSort();

module.exports = applyCustomSort;
