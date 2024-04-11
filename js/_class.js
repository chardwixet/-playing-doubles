function checkNumb(value) {
  if(typeof value !== 'number' || value <= 0) {
    console.log(value)
    throw new TypeError('Значение должно быть числом больше 0')
  } else {
    return value;
  }
}

export class Card {

  constructor(id, ul, flip) {
    this.ul = ul;
    this.open = false;
    this.verify = false;
    this.flip = flip;
    this.button = document.createElement('button');
    this.cardNumber;
    this.id = checkNumb(id);

  }

  createElement(){
    const li = document.createElement('li');


    li.classList.add('cards__item');
    this.button.classList.add('cards__btn', 'btn-reset', 'card__background');

    this.button.id = `${this.id}`;

    this.ul.append(li);
    li.append(this.button);

    li.addEventListener('click', () => this.flip(this));
  }

  set cardNumber(value) {
    console.log('set зашло');
    this._cardNumber = value;
    if(this.button) {
      console.log('пытаюсь занести в button')
      this.button.textContent = this._cardNumber;
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(boolVal) {
    this._open = boolVal;
  }
  get open() {
    return this._open;
  }
  set verify(boolVal) {
    this._verify = boolVal;
  }
  get verify() {
    return this._verify;
  }


}

export class AmazingCard extends Card{


  set cardNumber(value) {
    this._cardNumber = value;

    const cardsImgArray = [
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg',
      'img/4.jpg',
      'img/5.jpg',
      'img/6.jpg',
      'img/7.jpg',
      'img/8.jpg',
      'img/9.jpg',
      'img/10.jpg',
   ]

   this.img.src = cardsImgArray[value]
    // Добавьте изображение на карту.
  }

  get cardNumber() {
    return this._cardNumber;
  }

  addImage() {
    this.img = document.createElement('img');
    this.img.classList.add('card__img', 'none')
    this.img.alt = `картинка id: ${this.id}`
    this.button.append(this.img);

  }

}
