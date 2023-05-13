const depositTypeSelector = document.getElementById("depositTypeSelector");
const depositdurationSelector = document.getElementById("depositdurationSelector");
const calculateButton = document.getElementById("calculateButton");
const depositeSizeInput = document.getElementById("depositeSizeInput");
const output = document.getElementById("outputBox");

document.addEventListener('DOMContentLoaded', function () {

    // Обработчик события изменения depositTypeSelector
    depositTypeSelector.addEventListener("change", function () {

        try {
            //Добавляем в depositdurationSelector только доступные продолжительности вклада
            switch (depositTypeSelector.value) {
                case "option1":  //Для пополняемого вклада
                    depositdurationSelector.innerHTML = "";
                    depositdurationSelector.add(new Option("6 месяцев", "option1.1"));
                    depositdurationSelector.add(new Option("1 год", "option1.2"));
                    depositdurationSelector.add(new Option("1,5 года", "option1.3"));
                    depositdurationSelector.add(new Option("2 года", "option1.4"));
                    break;
                case "option2":  //Для срочного вклада
                    depositdurationSelector.innerHTML = "";
                    depositdurationSelector.add(new Option("3 месяца", "option2.1"));
                    depositdurationSelector.add(new Option("6 месяцев", "option2.2"));
                    depositdurationSelector.add(new Option("9 месяцев", "option2.3"));
                    depositdurationSelector.add(new Option("1 год", "option2.4"));
                    depositdurationSelector.add(new Option("1,5 года", "option2.5"));
                    depositdurationSelector.add(new Option("2 года", "option2.6"));
                    break;
                default:
                    throw new Error("Ошибка в обработчике события depositTypeSelector -> change: неожиданный case");
            }
        } catch (error) {
            alert("Проверьте заполнение полей");
        }

    });

    //Проверка значения поля input
    depositeSizeInput.addEventListener('input', function () {
        let value = parseInt(depositeSizeInput.value);

        if (value < depositeSizeInput.min) {
            value = depositeSizeInput.min;
        }
        if (value > depositeSizeInput.max) {
            value = depositeSizeInput.max;
        }
        depositeSizeInput.value = value;
    });

    // Обработчик события нажатия на кнопку расчёта
    calculateButton.addEventListener("click", function () {
        let depositType; //Тип вклада
        let durationTxt; //Длительность в текстовом формате
        let duration; //Длительность в годах
        let interestRate; //Процент
        try {
            //Получаем тип вклада
            switch (depositTypeSelector.value) {
                case "option1":
                    depositType = "пополняемый";
                    break;
                case "option2":
                    depositType = "срочный"
                    break;
                default:
                    throw new Error("Ошибка в обработчике события calculateButtonSelector -> click -> switch (depositTypeSelector.value): неожиданный case");
            }

            //Получаем процент по периоду
            switch (depositdurationSelector.value) {
                case "option1.1":
                    durationTxt = "6 месяцев";
                    duration = 6 / 12;
                    interestRate = 0.2;
                    break;
                case "option1.2":
                    durationTxt = "1 год";
                    duration = 1;
                    interestRate = 0.22;
                    break;
                case "option1.3":
                    durationTxt = "1,5 года";
                    duration = 1.5;
                    interestRate = 0.15;
                    break;
                case "option1.4":
                    durationTxt = "2 года";
                    duration = 2;
                    interestRate = 0.1;
                    break;
                case "option2.1":
                    durationTxt = "3 месяца";
                    duration = 3 / 12;
                    interestRate = 0.20;
                    break;
                case "option2.2":
                    durationTxt = "6 месяцев";
                    duration = 6 / 12;
                    interestRate = 0.22;
                    break;
                case "option2.3":
                    durationTxt = "9 месяцев";
                    duration = 9 / 12;
                    interestRate = 0.23;
                    break;
                case "option2.4":
                    durationTxt = "1 год";
                    duration = 1;
                    interestRate = 0.24;
                    break;
                case "option2.5":
                    durationTxt = "1,5 года";
                    duration = 1.5;
                    interestRate = 0.18;
                    break;
                case "option2.6":
                    durationTxt = "2 года";
                    duration = 2;
                    interestRate = 0.15;
                    break;
                default:
                    throw new error("Ошибка в обработчике события calculateButtonSelector -> click -> switch (depositdurationSelector.value):"
                        + "неожиданный case");
            }
            let result = +depositeSizeInput.value + depositeSizeInput.value * duration * interestRate;
            let outputText = "При создании депозита типа " + depositType
                            + " на сумму " + depositeSizeInput.value
                            + " на срок " + durationTxt
                            + " позволит получить " + (interestRate * 100) + "% годовых."
                            + " Итого по истечению срока вы получите: " + result + ".";
            output.textContent = outputText;
        } catch (error) {
            alert("Проверьте заполнение полей");
        }
    });
});