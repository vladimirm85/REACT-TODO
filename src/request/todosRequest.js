const BASE_URL = 'https://srapi-todo-api.herokuapp.com/todos';

function getTodos () {
    return new Promise ((resolve, reject) => {
        fetch(BASE_URL).then( response => {
            if(response.status !== 200){
                // TODO
                /*
                return response.text().then( text => {
                    throw new Error(text);
                });
                */
            };
            resolve (response.json());
        }).catch( error => reject(error));
    });
};

function addTodo (name) {
    let todo = {
        name,
        complete: false
    }
    return new Promise ((resolve, reject) => {
        const addTodo = fetch(BASE_URL, {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        
        addTodo.then( response => {
            if(response.status !== 200){
                // TODO
            };
            resolve(response.json());
        }).catch( error => reject(error));
    });
};

function updateTodo (id, complete) {
    const updates = {
        complete: !complete
    }
    return new Promise ((resolve, reject) => {
        const updateTodo = fetch(BASE_URL + '/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })

        updateTodo.then( response => {
            if(response.status !== 200){
                // TODO
            };
            resolve(response.json());
        }).catch( error => reject(error));
    });
}

function deleteTodo (id) {
    return new Promise ((resolve, reject) => {
        const deleteTodo = fetch(BASE_URL + '/' + id, {
            method: 'delete'
        })

        deleteTodo.then( response => {
            if(response.status !== 200){
                // TODO
            };
            resolve(response.json());
        }).catch( error => reject(error));
    });
}

export { getTodos, addTodo, deleteTodo, updateTodo }