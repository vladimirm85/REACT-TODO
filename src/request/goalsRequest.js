const BASE_URL = 'https://srapi-todo-api.herokuapp.com/goals';

function getGoals () {
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

function addGoal (name) {
    let goal = {
        name
    }
    return new Promise ((resolve, reject) => {
        const addGoal = fetch(BASE_URL, {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal)
        });
        
        addGoal.then( response => {
            if(response.status !== 200){
                // TODO
            };
            resolve(response.json());
        }).catch( error => reject(error));
    });
};

function deleteGoal (id) {
    return new Promise ((resolve, reject) => {
        const deleteGoal = fetch(BASE_URL + '/' + id, {
            method: 'delete'
        })

        deleteGoal.then( response => {
            if(response.status !== 200){
                // TODO
            };
            resolve(response.json());
        }).catch( error => reject(error));
    });
}

export { getGoals, addGoal, deleteGoal }