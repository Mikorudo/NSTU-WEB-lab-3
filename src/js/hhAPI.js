//axios
import axios, {isCancel, AxiosError} from 'axios';

const searchButton = document.querySelector('#searchButton');
const searchField = document.querySelector('#searchField');
const vacancies = document.getElementById("vacancies");


searchButton.addEventListener('click', () => {
  const searchText = searchField.value;
  axios.get(`https://api.hh.ru/vacancies?text=${searchText}`)
    .then((response) => {
        const items = response.data.items;
        let output = '';

        for (let i = 0; i < items.length; i++) {
            const vacancy = items[i];
            const id = vacancy.id;
            const name = vacancy.name;
            const areaName = vacancy.area.name;
            const salaryFrom = vacancy.salary ? vacancy.salary.from : 'не указано';
            const salaryTo = vacancy.salary ? vacancy.salary.to : 'не указано';
            const typeName = vacancy.type.name;
            const employerName = vacancy.employer.name;
            const requirement = vacancy.snippet.requirement;
            const responsibility = vacancy.snippet.responsibility;
            const contacts = vacancy.contacts ? vacancy.contacts.name : 'не указано';

            output += `
                <div class="vacancy">
                <h2>${name}</h2>
                <p>Ссылка: <a href="https://hh.ru/vacancy/${id}">hh.ru/vacancy/${id}</a></p>
                <p>Город: ${areaName}</p>
                <p>Зарплата: ${salaryFrom} - ${salaryTo}</p>
                <p>Тип вакансии: ${typeName}</p>
                <p>Работодатель: ${employerName}</p>
                <p>Требования: ${requirement}</p>
                <p>Обязанности: ${responsibility}</p>
                <p>Контакты: ${contacts}</p>
                </div>
            `;
        }
        vacancies.innerHTML = output;
    })
    .catch((error) => {
        vacancies.textContent = error;
    });
});