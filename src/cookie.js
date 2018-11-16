/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const getCookies = () => {
    return document.cookie.split(';').map((current) => {
        const [name, value] = current.split('=');

        return { name, value }
    });
};

const getTd = (text) => {
    const td = document.createElement('td');

    td.innerText = text;
    return td;
}

const addToList = ({ name, value }) => {
    let tr = document.createElement('tr'),
        td = document.createElement('td'),
        deleteButton = document.createElement('button');

    deleteButton.innerText = 'удалить';
    deleteButton.dataset.cookieName = name;

    tr.appendChild(getTd(name));
    tr.appendChild(getTd(value));
    tr.appendChild(deleteButton);

    listTable.appendChild(tr);
};

updateCookiesList();

function createCookieList(cookies = getCookies()) {
    listTable.innerHTML = '';

    for (let c of cookies) {
        if (c) {
            addToList(c);
        }
    }
}

filterNameInput.addEventListener('keyup', () => {
    updateCookiesList();
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value};`;
    updateCookiesList();
    // здесь можно обработать нажатие на кнопку "добавить cookie"
});

listTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        eraseCookie(e.target.dataset.cookieName);
        updateCookiesList()
    }
});

function updateCookiesList() {
    const filterWord = filterNameInput.value;

    if (filterWord) {
        const filterdCookies = getCookies().filter(c => filterCookie(c, filterWord));
        createCookieList(filterdCookies);
    } else {
        createCookieList();
    }
}

function filterCookie({ name, value }, niddle) {
    name = name.toLowerCase();
    value = value.toLowerCase();

    let regExp = new RegExp(niddle);

    return name.search(regExp) > -1 || value.search(regExp) > -1;
}

function eraseCookie(name) {
    document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}
