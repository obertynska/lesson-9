'use strict';

const buttonCalculate = document.getElementById("start");
const buttonCancel = document.getElementById("cancel");
const incomesPlus = document.getElementsByTagName("button")[0];
const expensesPlus = document.getElementsByTagName("button")[1];
const depositCheck = document.querySelector("#deposit-check");
const checkMark = document.querySelector(".deposit-checkmark");
const possibleIncomesNames = document.querySelectorAll(".additional_income-item");
const budgetDay = document.getElementsByClassName("budget_day-value")[0];
const expensesMonth = document.getElementsByClassName("expenses_month-value")[0];
const addIncomesValues = document.getElementsByClassName("additional_income-value")[0];
const addExpensesValues = document.getElementsByClassName("additional_expenses-value")[0];
const incomeValueOfPeriod = document.getElementsByClassName("income_period-value")[0];
const targetMonth = document.getElementsByClassName("target_month-value")[0];
const budgetMonth = document.querySelector(".budget_month-value");
const salary = document.querySelector(".salary-amount");
const addIncomeName = document.querySelectorAll(".income-title")[1];
const addIncomeNameAmount = document.querySelector(".income-amount");
const obligatoryExpensesName = document.querySelectorAll(".expenses-title")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
const possibleExpenses = document.querySelector(".additional_expenses-item");
const targetAmount = document.querySelector(".target-amount");
const rangePeriod = document.querySelector(".period-select");
const rangePeriodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll('.income-items');
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

buttonCalculate.disabled = true;


class AppData {
	constructor() {
		    this.budget = 0;
			this.budgetDay = 0;
			this.budgetMonth = 0;
			this.income = {};
			this.incomeMonth = 0;
			this.addIncome = [];
			this.expenses = {};
			this.expensesMonth = 0;
			this.deposit = false;
			this.percentDeposit = 0;
			this.moneyDeposit = 0;
			this.addExpenses = [];
	}
	check() {
		if(salary.value !== ''){
			start.removeAttribute('disabled');
		}
	}

	start() {
		if(salary.value === ''){
			start.setAttribute('disabled', 'true');
			return;
		}
		const allInput = document.querySelectorAll('.data input[type = text');
		allInput.forEach(item =>{
			item.setAttribute('disabled', 'true');
		});
		expensesPlus.setAttribute('disabled', 'true');
		incomesPlus.setAttribute('disabled', 'true');
		buttonCalculate.style.display ='none';
		buttonCancel.style.display ='block';

		this.budget = +salary.value;
		this.getExpInc();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncomes();
		this.getInfoDeposit();
		this.getBudget();

		this.showResult();
	}

	showResult(){
		budgetMonth.value = this.budgetMonth;
		budgetDay.value = this.budgetDay;
		expensesMonth.value = this.expensesMonth;
		addExpensesValues.value = this.addExpenses.join(', ');
		addIncomesValues.value = this.addIncome.join(', ');
		targetMonth.value = Math.ceil(this.getTargetMonth());
		incomeValueOfPeriod.value = this.calcPeriod();

		rangePeriod.addEventListener('change', () =>{
			incomeValueOfPeriod.value = this.calcPeriod();
		});
	}
	addExpensesBlock(){
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll(".expenses-items");

		if(expensesItems.length === 3){
			expensesPlus.style.display = 'none';
		}
	}

	addIncomesBlock(){
		const cloneExpensesItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomesPlus);
		incomeItems = document.querySelectorAll(".income-items");

		if(incomeItems.length === 3){
			incomesPlus.style.display = 'none';
		}
	}

	getExpInc(){
		const count = (item, index) => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if(itemTitle !== '' && itemAmount !== ''){
				this[startStr][itemTitle + index] = +itemAmount;
			}
		};
		incomeItems.forEach(count);
		expensesItems.forEach(count);

		for( let key in this.income){
			this.incomeMonth += +this.income[key];
		}
	}

	getAddExpenses(){
		const additionalExpenses = possibleExpenses.value.split(',');
		additionalExpenses.forEach(item => {
			item = item.trim();
			if(item !== ''){
				this.addExpenses.push(item);
			}
		}, this);
	}

	getAddIncomes(){
		possibleIncomesNames.forEach(item =>{
			let itemValue = item.value.trim();
			if(itemValue !== ''){
				this.addIncome.push(itemValue);
			}
		}, this);
	}
	getAddIncomes(){
		possibleIncomesNames.forEach(item =>{
			let itemValue = item.value.trim();
			if(itemValue !== ''){
				this.addIncome.push(itemValue);
			}
		}, this);
	}
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}
	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	getTargetMonth() {
		return targetAmount.value / this.budgetMonth;
	}

	calcPeriod() {
		return this.budgetMonth * rangePeriod.value;
	}
	reset() {

		const inputs = document.querySelectorAll('input[type=text]');
		inputs.forEach(item =>{
			item.value = '';
			item.removeAttribute('disabled');
		});

		rangePeriodAmount.textContent = "1";
		rangePeriod.value = "1";
		buttonCancel.style.display ='none';
		buttonCalculate.style.display ='block';

		const addedIncomesBlock = document.querySelector('.income');
		const addedIncomes = document.querySelectorAll('.income-items');


		for(let i = 1; i<addedIncomes.length; i++){
			addedIncomesBlock.removeChild(addedIncomes[i]);
		}

		const addedExpensesBlock = document.querySelector('.expenses');
		const addedExpenses = document.querySelectorAll('.expenses-items');


		for(let i = 1; i<addedExpenses.length; i++){
			addedExpensesBlock.removeChild(addedExpenses[i]);
		}


		const btnPlus = document.querySelectorAll('.btn_plus');
		btnPlus.forEach(item =>{
			item.style.display = 'block';
			item.removeAttribute('disabled');

		});


		depositCheck.checked = false;
		
		depositCheck.checked = false;
		depositBank.value = '';
		depositBank.style.display  = 'none';
		depositAmount.style.display = 'none';
		depositPercent.style.display = 'none';

		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.expensesMonth = 0;
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.addExpenses = [];

	}

	getInfoDeposit(){
        if(this.deposit){
        	this.percentDeposit = depositPercent.value;
        	this.moneyDeposit = depositAmount.value;
		}
	}
	changePercent(){
		const selectValue = this.value;
		if (selectValue === 'other'){
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
			depositPercent.addEventListener('input', ()=>{
				if(depositPercent.value > 100 || depositPercent.value < 0 || isNaN(parseFloat(depositPercent.value))){
					alert('Введите корректное значение в поле проценты');
					start.setAttribute('disabled', 'true');
					depositPercent.value = '';
				} else{
					start.removeAttribute('disabled');
				}
			});

		}else{
			depositPercent.value = selectValue;
			depositPercent.style.display = 'none';
		}
	}
	depositHandler(){
		if(depositCheck.checked){
			depositBank.style.display  = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display  = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			depositPercent.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}

	eventsListeners(){

		buttonCalculate.addEventListener('click', this.start.bind(this));

		expensesPlus.addEventListener('click', this.addExpensesBlock);

		incomesPlus.addEventListener('click', this.addIncomesBlock);

		salary.addEventListener('keyup', this.check);


		rangePeriod.addEventListener('input', event =>{
			rangePeriodAmount.textContent = event.target.value;
		});

		buttonCancel.addEventListener('click', this.reset.bind(this));

		depositCheck.addEventListener('change', this.depositHandler.bind(this));


	}


}



const appData = new AppData();

appData.eventsListeners();








