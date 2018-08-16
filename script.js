const date = document.querySelector('[name=date]')
date.valueAsDate = new Date();

const addItems = document.querySelector('.addItems')
const itemList = document.querySelector('.itemList')
const titleForm = document.querySelector('.title_form')
const info = document.querySelector('.info')
const sampleData = [
	{"text":"Sample Item","date":"2018-05-21T14:53:18.883Z","done":false},
	{"text":"Another Sample","date":"2018-05-21T14:53:26.899Z","done":false}
];
const items = JSON.parse(localStorage.getItem('items')) || sampleData;

// 1. Getting the title from local storage OR fallback to default title
let title = localStorage.getItem('localTitle') || 'Laundry List ✎ Edit this!';
// 2. Getting the title from the form
document.querySelector('[name=title]').value = title;
// 3. Setting the document title tag
document.title = title;

function updateTitle(e) {
	// e.preventDefault();
	const titleValue = (this.querySelector('[name=title]')).value;
	console.log(titleValue);
	title = titleValue;
	localStorage.setItem('localTitle', title)

}

titleForm.addEventListener('submit', updateTitle);
titleForm.addEventListener('mouseout', updateTitle);



function addItem(e) {
	e.preventDefault();
	// Getting the value of text input field
	const text = (this.querySelector('[name=item]')).value;
	const date = (this.querySelector('[name=date]')).value || new Date();
	if (!text) return; // If there is no input in text then exit, do nothing

	// Setting up an item variable to temporary hold data
	const item = {
		text,
		date,
		done: false
	}
	// Adding the item to the array of items
	items.push(item)
	// Populating the page with the new items
	populateList(items, itemList);
	// Adding the data to local storage
	localStorage.setItem('items', JSON.stringify(items))
	// Resetting the form fields
	this.reset()
}

function populateList(clothes = [], clothesList) {
	clothesList.innerHTML = clothes.map((cloth, i) => {
		return `
		<li>
			<input type='checkbox' data-index=${i} id='item${i}' ${cloth.done ? 'checked' : ''} />
			<label for=''><strong>${cloth.text}</strong></label>
			<span><small>(${moment(cloth.date).fromNow()})</small></span>
			<span><small><a href="#" data-index=${i} class='update' title='Set the timer to current time'>Set to now</a></small></span>
			<span class='delete_box'><small><a href="#" data-index=${i} class='delete' title="Remove ${items[i].text} from the list">&times;</a></small></span>
		</li>
		`;
	}).join('');
}

function toggleDone(e) {
	// console.log(e);
	const el = e.target;
	const index = el.dataset.index;

	// console.log(e.target);
	if(e.target.className === 'update') {
		items[index].date = new Date();
		localStorage.setItem('items', JSON.stringify(items))
		populateList(items, itemList)
		console.log('updated item number ' + index);
	}

	if(e.target.className === 'delete') {
		items.splice(index, 1);
		localStorage.setItem('items', JSON.stringify(items))
		populateList(items, itemList)
		console.log('deleted item number ' + index);

	}
}

addItems.addEventListener('submit', addItem)
itemList.addEventListener('click', toggleDone)

populateList(items, itemList)
