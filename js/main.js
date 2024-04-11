

  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

import { Card, AmazingCard } from '../js/_class.js';

  function createNumbersArray(count) {

      let arr = [];
      let id = 1;

      let value = 1;



      for (let i = 0; i < count; i = i + 2) {

        arr.push({value, id: id});
        id++;
        arr.push({value, id: id});
        value++;
        id++;
      }
      // console.log(arr);
      return arr;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {

      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i].value, arr[j].value] = [arr[j].value, arr[i].value];
          [arr[i].open, arr[j].open] = [arr[j].open, arr[i].open];
          [arr[i].verify, arr[j].verify] = [arr[j].verify, arr[i].verify];
        }

        // console.log("после рандома", arr);
        return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек.
  // У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  async function createAreaCards(arr) {

    //переключение контента карт с цифр на картинки
    let flagImg = 1;

    let span = document.createElement('span');
    let div = document.createElement('div');
    let cards = document.querySelector('.cards');
    let ul = document.createElement('ul');
    ul.classList.add('list-reset', 'cards__list');
    div.classList.add('timer');

    span.textContent = 'Старт';

    let refreshId =  timer(60);

    function endGame(result) {
      let span = document.createElement('span');
      let button = document.createElement('a');
      let h1 = document.querySelector('.title');
      let ul = document.querySelector('.cards__list');
      let div = document.querySelector('.timer');
      let cards = document.querySelector('.cards');

      ul.remove();
      div.remove();


      span.classList.add('end-text');
      button.classList.add('btn-reset', 'form__btn', 'end-btn');
      button.href = 'index.html'
      h1.style = 'padding-top: 200px;';

      span.textContent = result ? 'Победа!' : 'Поражение';
      button.textContent = "Попробуем ещё?";

      cards.append(span);
      cards.append(button);

      clearInterval(refreshId);
    }

    function timer(second) {

      const time = (() => {

        return () => {
          if(second >= 0){
            second--;
            return second;
          }
          else {
            clearInterval(refreshId);
          }
        }
      })();

      const refreshId = setInterval(() => {
        const properID = time();
        let span = document.querySelector('.timer');
        span.textContent = properID;
        if (properID === 0) {
          clearInterval(refreshId);
          endGame(false);
        }

      }, 1000);

      return refreshId;
    }

    cards.append(div);
    div.append(span);
    cards.append(ul);

    let cardsArr = [];

    function flip(card) {
      function disabledCard (arr, flag) {
        for(const i in arr) {
          const button = document.getElementById(`${arr[i].id}`);
          if(flag === 0 && arr[i].verify === false) {

            button.disabled = true;
          }


          if(flag === 1 && arr[i].verify === false){

            button.disabled = false;
          }

        }
      }

      function checkResult(arr){
        let count = 0;
        for(const i in arr){
          if(arr[i].verify === true){
            count++
          }

          if(count === arr.length-1)
            endGame(true);
        }
      }

      function checkCard(cardsArr, value, id, el) {

        let prevId = 0;
        let prevEl;

        for(const i in cardsArr) {
          if(cardsArr[i].open === true && cardsArr[i].verify === false){
            prevId = cardsArr[i].id;
            prevEl = document.getElementById(`${prevId}`);

            disabledCard(cardsArr, 0);
            break;
          }
        }

        if(prevId != 0 && cardsArr[prevId - 1].id === cardsArr[id - 1].id){

          prevId = 0;
          cardsArr[id - 1].open = false;

          el.classList.add('card__background');

          if(flagImg === 0) {
            el.textContent = '';
          } else {
            card.img.classList.add('none')
          }

          disabledCard(cardsArr, 1);
          return;
        }

        for(const i in cardsArr) {

          if(cardsArr[i].cardNumber == value && cardsArr[i].open === false && cardsArr[i].id === id){
            cardsArr[i].open = true;
          }

          if(prevId != 0 && cardsArr[prevId - 1].cardNumber === cardsArr[id - 1].cardNumber){
            cardsArr[prevId - 1].verify = true;
            cardsArr[id - 1].verify = true;


            disabledCard(cardsArr, 1);

            prevEl.disabled = true;
            el.disabled = true;

            checkResult(cardsArr);
            return;
          }

          if(prevId != 0 && cardsArr[prevId - 1].open === true && cardsArr[id - 1].open === true){
            cardsArr[id - 1].open = false;
            cardsArr[prevId - 1].open = false;


            setTimeout(()=>{

              prevEl.classList.add('card__background');
              el.classList.add('card__background');

              if(flagImg === 0) {
                prevEl.textContent = '';
                el.textContent = '';
              } else {
                const prevImg = prevEl.querySelector('img');
                const img = el.querySelector('img');

                img.classList.add('none');
                prevImg.classList.add('none');
              }

              disabledCard(cardsArr, 1);
            }, 500);



            prevId = 0;

            return;

          }
        }
      }
      this.button.classList.remove('card__background');

      if(flagImg === 0) {
        this.button.textContent = this.cardNumber;
      } else {
        card.img.classList.remove('none')
      }


      checkCard(cardsArr, this.cardNumber, this.id, this.button)
    }

      for(let i in arr) {

        if(flagImg === 0){
          cardsArr[i] = new Card(arr[i].id, ul, flip);
        } else {
          cardsArr[i] = new AmazingCard(arr[i].id, ul, flip);
          cardsArr[i].addImage();
        }
        cardsArr[i].cardNumber = arr[i].value;
        cardsArr[i].createElement();

      }



  }

  function startGame(count) {


    let title = document.querySelector('.title');
    let arr = createNumbersArray((count * count));
    let arrShuffle = shuffle(arr);

    title.style = "padding: 60px 0; padding-bottom: 30px; margin: 0;"
    document.documentElement.style.cssText = `--offsets: ${Math.sqrt((count * count)) - 1}` // задаёт поле

    createAreaCards(arrShuffle);

    return arrShuffle;
  }

  function createForm() {

    let cards = document.querySelector('.cards');
    let form = document.createElement('form');
    let input = document.createElement('input');
    let btnForm = document.createElement('button');
    let text = document.createElement('span');



    form.classList.add('form');
    text.textContent = 'Количество карточек по вертикали/горизонтали';
    text.classList.add('form__text');
    input.classList.add('form__input');
    input.type = 'number';
    input.min = 2;
    input.value = 4;
    btnForm.classList.add('btn-reset', 'form__btn');
    btnForm.textContent = 'Начать игру';


    form.append(text);
    form.append(input);
    form.append(btnForm);
    cards.append(form);

    form.addEventListener('submit', (e)=>{
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      form.remove(cards);
      startGame(input.value);

    })
  }

createForm();




