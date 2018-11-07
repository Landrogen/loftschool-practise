/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('div');

    div.classList.add('draggable-div');
    div.style.width = `${Math.random() * 100}%`;
    div.style.height = `${Math.random() * 100}%`;
    div.style.top = `${Math.random() * 100}%`;
    div.style.left = `${Math.random() * 100}%`;
    div.style.position = `absolute`;
    div.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let width = target.style.width,
        height = target.style.height,
        shiftX,
        shiftY;

    target.addEventListener('mousedown', (e) => {
        let coords = getCoords(target);

        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;
        target.style.zIndex = 1000;

        document.addEventListener('mousemove', moveTo);
        target.addEventListener('dragstart', () => false);
        target.addEventListener('mouseup', function upHandler() {
            document.removeEventListener('mousemove', moveTo);
            target.removeEventListener('mouseup', upHandler);
        });
    });

    function moveTo(e) {
        target.style.top = `${e.pageY - shiftY}px`;
        target.style.left = `${e.pageX - shiftX}px`;
    }

    function getCoords(target) {
        let box = target.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
