
let expenses = document.getElementById('expenses');
let description = document.getElementById('description');
let category = document.getElementById('cetogary');
let check = document.getElementById('autoSizingCheck');
let form = document.getElementById('form');
let notes = localStorage.getItem('notes');
let items = document.getElementById('items');

form.addEventListener('submit', onSubmit);
items.addEventListener('click', deleteItem);
items.addEventListener('click', editItem);

obj = {
  newExpenses: 0,
  newDescription: '',
  newCetogary: ''
};

function onSubmit(e) {
 
  obj.newExpenses = expenses.value;
  obj.newDescription = description.value;
  obj.newCetogary = category.value;

  if (notes === null) {
    collection = [];
  }
  else {
    collection = JSON.parse(notes);
  };
  collection.push(obj)
  let newobj = JSON.stringify(collection);
  localStorage.setItem('notes', newobj);

}

function showItems() {
  notes = localStorage.getItem('notes');
  collection = JSON.parse(notes);
  if (collection === null) {
    collection = [];
  }
  collection.forEach(function (i) {
    let li = document.createElement('li');
    let deletebtn = document.createElement('button');
    let editbtn = document.createElement('button');

    li.className = 'list-group-item';
    deletebtn.className = 'Delete btn btn-danger';
    editbtn.className = 'Edit btn btn-primary';

    li.innerText = `${i.newDescription} -${i.newCetogary} -${i.newExpenses}`;
    deletebtn.innerText = 'Delete';
    editbtn.innerText = 'Edit';

    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    items.appendChild(li);
  });
}
showItems()

function deleteItem(e) {
  e.preventDefault();
  if (e.target.classList.contains('Delete')) {
    let li = e.target.parentElement;
    text = li.innerText;
    text = text.split(' -');
    let text2 = text[1]
    let newText = text[0];
    items.removeChild(li);

    notes = localStorage.getItem('notes');
    collection = JSON.parse(notes);
    for (let j = 0; j < collection.length; j++) { 
      if (collection[j].newDescription === newText && collection[j].newCetogary === text2) {
        console.log(text2)
        collection.splice(j, 1);
      }
    }
    let newobj = JSON.stringify(collection);
    localStorage.setItem('notes', newobj);
  }
}


function editItem(e) {
  e.preventDefault();
  if (e.target.classList.contains('Edit')) {
    let li = e.target.parentElement;
    text = li.innerText;
    text = text.split(' -');
    let newText = text[0];
    items.removeChild(li);

    notes = localStorage.getItem('notes');
    collection = JSON.parse(notes);
    for (let j = 0; j < collection.length; j++) {
      if (collection[j].newDescription === newText) {
        document.getElementById('expenses').value = collection[j].newExpenses;
        document.getElementById('description').value = collection[j].newDescription;
        document.getElementById('cetogary').value = collection[j].newCetogary;
        collection.splice(j, 1);
      }
    }
    let newobj = JSON.stringify(collection);
    localStorage.setItem('notes', newobj);
  }
}
