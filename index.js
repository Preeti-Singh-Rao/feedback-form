let editmode = "";
let oneStarCount = 0;
let twoStarCount = 0;
let threeStarCount = 0;
let fourStarCount = 0;
let fiveStarCount = 0;

function getAllFeeback() {
    fetch('https://crudcrud.com/api/9d35bc84d25a40b8bd2084cbc3a31ac9/users')
        .then((response) => response.json())
        .then((response) => {
            let feedbackList = document.getElementById('feedbackList');
            feedbackList.innerHTML = '';

            // Reset star counts
            oneStarCount = 0;
            twoStarCount = 0;
            threeStarCount = 0;
            fourStarCount = 0;
            fiveStarCount = 0;

            response.forEach((item) => {
                updateStarRatings(item.rating);
                renderFeedbackItem(item);
            });

            // Update star counts display
            document.getElementById('oneStarCount').innerText = oneStarCount;
            document.getElementById('twoStarCount').innerText = twoStarCount;
            document.getElementById('threeStarCount').innerText = threeStarCount;
            document.getElementById('fourStarCount').innerText = fourStarCount;
            document.getElementById('fiveStarCount').innerText = fiveStarCount;
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateStarRatings(rating) {
    switch (rating) {
        case "1":
            oneStarCount++;
            break;
        case "2":
            twoStarCount++;
            break;
        case "3":
            threeStarCount++;
            break;
        case "4":
            fourStarCount++;
            break;
        case "5":
            fiveStarCount++;
            break;
    }
}

function renderFeedbackItem(item) {
    let feedbackList = document.getElementById('feedbackList');
    let liTag = document.createElement('li');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('id', item._id);
    deleteBtn.addEventListener('click', function() {
        deleteUser(item._id);
    });

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.setAttribute('id', item._id);
    editBtn.addEventListener('click', () => editFeedback(item));

    div1.innerText = item.name;
    div2.innerText = item.rating;
    liTag.appendChild(div1);
    liTag.appendChild(div2);
    liTag.appendChild(deleteBtn);
    liTag.appendChild(editBtn);
    feedbackList.appendChild(liTag);
}

let submitform = document.getElementById('submitForm');

submitform.addEventListener('click', function(event) {
    event.preventDefault();
    editmode === "" ? addUser(event) : updateFeedback(editmode);
});

function deleteUser(id) {
    fetch(`https://crudcrud.com/api/9d35bc84d25a40b8bd2084cbc3a31ac9/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(() => {
        getAllFeeback();
    })
    .catch((err) => {
        console.log(err);
    });
}

function addUser(event) {
    let inputEle = document.getElementById('name');
    let ratings = document.getElementById('ratingValues');
    
    let feedback = {
        name: inputEle.value,
        rating: ratings.value
    };
    
    fetch('https://crudcrud.com/api/9d35bc84d25a40b8bd2084cbc3a31ac9/users', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then(() => {
        editmode = "";
        getAllFeeback();
    })
    .catch((error) => {
        console.log(error);
    });
}

function editFeedback(item) {
    let inputEle = document.getElementById('name');
    let ratings = document.getElementById('ratingValues');
    inputEle.value = item.name;
    ratings.value = item.rating;
    editmode = item._id;
}

function updateFeedback(id) {
    let inputEle = document.getElementById('name');
    let ratings = document.getElementById('ratingValues');

    let feedback = {
        name: inputEle.value,
        rating: ratings.value
    };

    fetch(`https://crudcrud.com/api/9d35bc84d25a40b8bd2084cbc3a31ac9/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(feedback),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(() => {
        getAllFeeback();
        editmode = "";
    })
    .catch((error) => {
        console.log(error);
    });
}

getAllFeeback();
