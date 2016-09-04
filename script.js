// DOM
function additionFunction(x) {
  return function(y) {
    return x + y;
  };
}

var shouldBeThree = additionFunction(1)(2)

console.log(shouldBeThree);

const oList = document.getElementById('oList'); // o = original data
const sList = document.getElementById('sList'); // s = sortable data

const txt = (value) => document.createTextNode(value);

const row = (name, age) => {
    let tr = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td');

    td1.appendChild(name);
    td2.appendChild(age);
    tr.appendChild(td1);
    tr.appendChild(td2);

    return tr;
};

//initial states
const DEFAULT_STATE = {
    sort: 0,
    persons: [
        { name: "Ana", age: 34 },
        { name: "Genji", age: 25 },
        { name: "Tracer", age: 45 },
        { name: "Reaper", age: 15 },
        { name: "D'Va", age: 5 },
        { name: "McCree", age: 30 }
    ]
};

/**
// display the two tables with the same data
// oTable will stay the same on sort
// sTable will change on sort
*/
const oTable = document.createElement('table');
DEFAULT_STATE.persons.forEach((person) => {
    let name = txt(person.name);
    let age = txt(person.age);
    oTable.appendChild(row(name, age));
});
oList.appendChild(oTable);

let updateTable = (newData) => {
    let sTable = document.createElement('table');
    if (sList.childNodes.length >= 1)
        sList.removeChild(sList.firstChild);
    newData.forEach((person) => {
        let name = txt(person.name);
        let age = txt(person.age);
        sTable.appendChild(row(name, age));
    });
    sList.appendChild(sTable);
}

//init the sortable table
updateTable(DEFAULT_STATE.persons);


//STORE
const store = Redux.createStore(counter)

//DISPATCH DECREMNET
document.getElementById('ascending'). // vanilla JS
    addEventListener('click', () => {
        const action = { type: 'ASCENDING' };
        store.dispatch(action);
    });

//DISPATCH INCREMENT
document.getElementById('descending'). // vanilla JS
    addEventListener('click', () => {
        const action = { type: 'DESCENDING' };
        store.dispatch(action);
    });

//REDUCER
function counter(currentState, action) {
    let nextState = currentState == undefined ?
        {
            sort: DEFAULT_STATE.sort,
            persons: DEFAULT_STATE.persons.slice(0)
        } :
        {
            sort: currentState.sort,
            persons: currentState.persons.slice(0)
        }
    /*
        if (currentState == undefined) {
            return nextState = Object.assign({}, DEFAULT_STATE);;
        }
    */
    switch (action.type) {
        case 'ASCENDING':
            nextState.sort = 1;
            nextState.persons.sort((a, b) => a.age - b.age);
            break;
        case 'DESCENDING':
            nextState.sort = -1;
            nextState.persons.sort((a, b) => b.age - a.age);
            break;
        default:
            break;
    };

    return nextState;
}

//RENDER




function render() {
    console.log(store.getState().sort);
    console.log(store.getState().persons);

    updateTable(store.getState().persons);

};

//subscribe to the render function
store.subscribe(render);