class Phone {
    constructor(functionCount) {
        this.functionCount = functionCount; 
    }

    getCost() {
        return 40 * Math.log(this.functionCount); 
    }

    getDescription() {
        return `Вартість: ${this.getCost().toFixed(2)} UAH`;
    }
}

class Mobile extends Phone {
    constructor(functionCount, model) {
        super(functionCount); 
        this.model = model;   
    }

    getCost() {
        return super.getCost() * 3; 
    }

    getDescription() {
        return `Модель: ${this.model}, Вартість: ${this.getCost().toFixed(2)} UAH`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneFunctionCountInput = document.getElementById('functionCount');
    const mobileFunctionCountInput = document.getElementById('mobileFunctionCount');
    const modelInput = document.getElementById('model');
    const resultButton = document.getElementById('calculateCostBtn');
    const costOutput = document.getElementById('cost');
    const mobileCostOutput = document.getElementById('mobileCost');

    resultButton.addEventListener('click', () => {
        const phoneFunctionCount = parseInt(phoneFunctionCountInput.value);
        const mobileFunctionCount = parseInt(mobileFunctionCountInput.value);
        const model = modelInput.value;

        if (isNaN(phoneFunctionCount) || phoneFunctionCount < 1 || phoneFunctionCount > 30) {
            alert('Кількість функцій телефону повинна бути від 1 до 30!');
            return;
        }

        if (isNaN(mobileFunctionCount) || mobileFunctionCount < 1 || mobileFunctionCount > 30) {
            alert('Кількість функцій мобільного повинна бути від 1 до 30!');
            return;
        }

        const phone = new Phone(phoneFunctionCount); 
        const mobile = new Mobile(mobileFunctionCount, model); 

        costOutput.textContent = phone.getDescription();
        mobileCostOutput.textContent = mobile.getDescription();
    });
});
