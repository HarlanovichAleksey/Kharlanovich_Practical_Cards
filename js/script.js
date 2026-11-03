// 1. Находим все карточки
let chosEl = document.querySelectorAll(".chosed-blok-content > div");

// 2. Находим элементы для вывода (счётчик и сумма)
let countEl = document.querySelector(".info-panel #count");
let sumEl = document.querySelector(".info-panel #sum");

// 3. Объект состояния с методами
let stateCounter = {
    count: 0,
    sum: 0,
    
    // Обновляем количество
    setCount(value) {
        this.count += value;
        countEl.innerText = this.count;
    },
    
    // Обновляем сумму
    setSum(value) {
        this.sum += value;
        sumEl.innerText = this.sum;
    }
};

// 4. Именованная функция
function functionEvent(e) {
    // Получаем карточку (closest защищает от клика по span внутри)
    const card = e.target.closest('.card-item');
    
    // Если кликнули мимо карточки — прерываем
    if (!card) return; 

    // Получаем цену из data-атрибута
    const price = parseInt(card.dataset.price);

    // Если карточка НЕ выбрана
    if (!card.classList.contains("chosed-element")) {
        card.classList.add("chosed-element");
        stateCounter.setCount(1);     // Прибавляем к количеству
        stateCounter.setSum(price);   // Прибавляем к сумме
    } 
    // Если карточка УЖЕ выбрана
    else {
        card.classList.remove("chosed-element");
        stateCounter.setCount(-1);    // Отнимаем от количества
        stateCounter.setSum(-price);  // Отнимаем от суммы
    }
}

// 5. Перебираем карточки и вешаем обработчик
for (let i = 0; i < chosEl.length; i++) {
    chosEl[i].addEventListener("click", functionEvent);
}

// 6. Фишка с removeEventListener (отключаем 3-ю карточку по индексу 2)
 chosEl[2].removeEventListener('click', functionEvent);