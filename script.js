'use strict';

let buttonCalculate = document.getElementById("start");
let buttonCancel = document.getElementById("cancel");
let incomesPlus = document.getElementsByTagName("button")[0];
let expensesPlus = document.getElementsByTagName("button")[1];
let checkBox = document.querySelector("#deposit-check");
let checkMark = document.querySelector(".deposit-checkmark");
let possibleIncomesNames = document.querySelectorAll(".additional_income-item");
let budgetDay = document.getElementsByClassName("budget_day-value")[0];
let expensesMonth = document.getElementsByClassName("expenses_month-value")[0];
let addIncomesValues = document.getElementsByClassName("additional_income-value")[0];
let addExpensesValues = document.getElementsByClassName("additional_expenses-value")[0];
let incomeValueOfPeriod = document.getElementsByClassName("income_period-value")[0];
let targetMonth = document.getElementsByClassName("target_month-value")[0];
let budgetMonth = document.querySelector(".budget_month-value");
let salary = document.querySelector(".salary-amount");
let addIncomeName = document.querySelectorAll(".income-title")[1];
let addIncomeNameAmount = document.querySelector(".income-amount");
let obligatoryExpensesName = document.querySelectorAll(".expenses-title")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
let possibleExpenses = document.querySelector(".additional_expenses-item");
let targetAmount = document.querySelector(".target-amount");
let rangePeriod = document.querySelector(".period-select");
let rangePeriodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll('.income-items');





//all data types return true except number.

let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n) ;
};

buttonCalculate.disabled = true;


const AppData = function(){
	this.budget = 0,
	this.budgetDay = 0,
	this.budgetMonth = 0,	
	this.income = {},
	this.incomeMonth = 0,
	this.addIncome = [],
	this.expenses = {},
	this.expensesMonth = 0,	
	this.deposit = false,
	this.percentDeposit = 0,
	this.moneyDeposit = 0,
	this.addExpenses =[];
};

AppData.prototype.check = function() {
	if(salary.value !== ''){
		start.removeAttribute('disabled');
	}
};

AppData.prototype.start = function () {
	if(salary.value === ''){
		start.setAttribute('disabled', 'true');
		return;
	}
	let allInput = document.querySelectorAll('.data input[type = text');
	allInput.forEach(function(item){
		item.setAttribute('disabled', 'true');
	})
	expensesPlus.setAttribute('disabled', 'true');
	incomesPlus.setAttribute('disabled', 'true');
	buttonCalculate.style.display ='none';
	buttonCancel.style.display ='block';

	/*buttonCancel.addEventListener('click', this.reset);*/


	this.budget = +salary.value;
	this.getExpenses();
	this.getIncome();
	this.getExpensesMonth();
	this.getAddExpenses();
	this.getAddIncomes();
	this.getBudget();
	

	this.showResult();
	/*this.blockLeftInputs();*/

};


AppData.prototype.showResult = function(){
	budgetMonth.value = this.budgetMonth;
	budgetDay.value = this.budgetDay;
	expensesMonth.value = this.expensesMonth;
	addExpensesValues.value = this.addExpenses.join(', ');
	addIncomesValues.value = this.addIncome.join(', ');
	targetMonth.value = Math.ceil(this.getTargetMonth());
	incomeValueOfPeriod.value = this.calcPeriod();

	rangePeriod.addEventListener('change', function(event){
		incomeValueOfPeriod.value = appData.calcPeriod();
	});
};

AppData.prototype.addExpensesBlock = function(){      
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	expensesItems = document.querySelectorAll(".expenses-items");

	if(expensesItems.length === 3){
		expensesPlus.style.display = 'none';
	}
};

AppData.prototype.getExpenses = function(){
	expensesItems.forEach(function(item){
		let itemExpences = item.querySelector('.expenses-title').value;
		let cashExpences = item.querySelector('.expenses-amount').value;
		if(itemExpences !== '' && cashExpences !== ''){
			this.expenses[itemExpences] = cashExpences;
		}
	},this);
};

AppData.prototype.addIncomesBlock = function(){
	let cloneExpensesItem = incomeItems[0].cloneNode(true); 
	incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomesPlus);
	incomeItems = document.querySelectorAll(".income-items");

	if(incomeItems.length === 3){
		incomesPlus.style.display = 'none';
	}
};

AppData.prototype.getIncome = function(){

	incomeItems.forEach(function(item){
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = item.querySelector('.income-amount').value;
		if(itemIncome !== '' && cashIncome !== ''){
			this.income[itemIncome] = cashIncome;
		}
	},this);

	for( let key in this.income){
		this.incomeMonth += +this.income[key];
	}

};

AppData.prototype.getAddExpenses = function(){
	let additionalExpenses = possibleExpenses.value.split(',');
	additionalExpenses.forEach(function(item){
		item = item.trim();
		if(item !== ''){
			this.addExpenses.push(item);
		}
	}, this);
};   
AppData.prototype.getAddIncomes = function(){
	possibleIncomesNames.forEach(function(item){
		let itemValue = item.value.trim();
		if(itemValue !== ''){
			this.addIncome.push(itemValue);
		};
	}, this);
};

AppData.prototype.getExpensesMonth = function () {
	for (let key in this.expenses) {
		this.expensesMonth += +this.expenses[key];
	}
};
AppData.prototype.getBudget = function () {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
	return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
	if (this.budgetDay >= 1200) {
		console.log("У вас высокий уровень дохода 🤑");
	} else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
		console.log("У вас средний уровень дохода :wink:");
	} else if (this.budgetDay >= 0 && this.budgetDay < 600) {
		console.log("К сожалению у вас уровень дохода ниже среднего :sleepy:");
	} else {
		console.log("Что то пошло не так 🧐");
	}
};
AppData.prototype.calcPeriod = function () {
	return this.budgetMonth * rangePeriod.value;
};
AppData.prototype.reset = function () {
	let inputs = document.querySelector('.data').querySelectorAll('input[type=text]');
	inputs.forEach(function(item){
		item.value = '';
		item.removeAttribute('disabled');
	});
	rangePeriodAmount.textContent = "1";
	rangePeriod.value = "1";
	buttonCancel.style.display ='none';
	buttonCalculate.style.display ='block';

	let addedIncomesBlock = document.querySelector('.income');
	let addedIncomes = document.querySelectorAll('.income-items');


	for(let i = 1; i<addedIncomes.length; i++){
		addedIncomesBlock.removeChild(addedIncomes[i]);
	}

	let addedExpensesBlock = document.querySelector('.expenses');
	let addedExpenses = document.querySelectorAll('.expenses-items');


	for(let i = 1; i<addedExpenses.length; i++){
		addedExpensesBlock.removeChild(addedExpenses[i]);
	}


	let btnPlus = document.querySelectorAll('.btn_plus');
	btnPlus.forEach(function(item){
		item.style.display = 'block';
		//item.disabled = false;

	});

	
};




const appData = new AppData();
console.log(appData);


buttonCalculate.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomesPlus.addEventListener('click', appData.addIncomesBlock);

salary.addEventListener('keyup', appData.check);


rangePeriod.addEventListener('input', function(event){
	rangePeriodAmount.textContent = event.target.value;
});

buttonCancel.addEventListener('click', appData.reset.bind(appData));



