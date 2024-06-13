
let editmode ="";

function getAllFeeback(){fetch('https://crudcrud.com/api/47fd7917aec142739cf9c14043199eac/users')
.then((response)=>{
    response.json()
    .then((response)=>{
        console.log(response)

        feedbackList.innerHTML = '';
        response.map((item)=>{
          
            let feedbackList=document.getElementById('feedbackList');
            let liTag=document.createElement('li')
            let div1=document.createElement('div');
            let div2=document.createElement('div');
            
                   let deleteBtn=document.createElement('button');
                      deleteBtn.innerText='Delete';
                      deleteBtn.setAttribute('id',item._id)
                      deleteBtn.addEventListener('click',function(){deleteUser(item._id)});
                     
                      let editBtn = document.createElement('button')
                      editBtn.innerText = 'Edit';
                      editBtn.setAttribute('id', item._id);
                      editBtn.addEventListener('click', () => editFeedback(item));
              
console.log(div1,item);
                      div1.innerText=item.name;
                      div2.innerText=item.rating;
                      liTag.appendChild(div1)
                      liTag.appendChild(div2)
                      liTag.appendChild(deleteBtn)
                      liTag.appendChild(editBtn)
                      feedbackList.appendChild(liTag)
                      


        })
    })
})
.catch((error)=>{
    console.log(error)
})}

let submitform=document.getElementById('submitForm')

submitform.addEventListener('click',function(event){
    event.preventDefault()
    editmode=="" ? addUser(event) : updateFeedback(event,editmode)})

function deleteUser(id){

    fetch(`https://crudcrud.com/api/47fd7917aec142739cf9c14043199eac/users/${id}`, {
        method:"DELETE",
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
})
.then((response)=>{
    response.json();

            let  feedbackList = document.getElementById('feedbackList');
            let itemToDelete = document.getElementById(id).parentElement;
            feedbackList.removeChild(itemToDelete);
    })
.catch((err)=>{
    console.log(err)
})
}

function addUser(event){
    
        event.preventDefault()
    
        let inputEle=document.getElementById('name');
        
        let ratings=document.getElementById('ratingValues');
       
    
        let feedback={
            name: inputEle.value,
            rating: ratings.value
        }
    
        fetch('https://crudcrud.com/api/47fd7917aec142739cf9c14043199eac/users',{
            method:"POST",
            body: JSON.stringify(feedback),
            headers: { 
              "Content-type": "application/json; charset=UTF-8"
          }
        })
    
        .then((response) => response.json())
        .then((json)=>{
            editmode = ""
            let feedbackList=document.getElementById('feedbackList');
                let liTag=document.createElement('li')
                let div1=document.createElement('div');
                let div2=document.createElement('div');
                
                       let deleteBtn=document.createElement('button');
                          deleteBtn.innerText='Delete';
                          deleteBtn.setAttribute('id',json._id)
                          deleteBtn.addEventListener('click',function(){deleteUser(item._id)});
    
                          let editBtn = document.createElement('button')
                          editBtn.innerText = 'Edit';
                          editBtn.setAttribute('id', json._id);
                          editBtn.addEventListener('click', () => editFeedback(item));
    
                          div1.innerText=json.name;
                          div2.innerText=json.rating;
                          liTag.appendChild(div1)
                          liTag.appendChild(div2)
                          liTag.appendChild(deleteBtn)
                          liTag.appendChild(editBtn)
                          feedbackList.appendChild(liTag)
    
                         
        })
    
        .catch((error)=>{
            console.log(error)
              })  
    
    }




function editFeedback (item){
    let inputEle=document.getElementById('name');
    
    let ratings=document.getElementById('ratingValues');
     inputEle.value=item.name;
     ratings.value=item.rating;
     editmode=item._id
   
    console.log(editmode);
}

function updateFeedback (event,id){
    let inputEle=document.getElementById('name');

    let ratings=document.getElementById('ratingValues');
    console.log(inputEle.value, ratings.value,id);
    let feedback={
        name: inputEle.value,
        rating: ratings.value
    }
    fetch(`https://crudcrud.com/api/47fd7917aec142739cf9c14043199eac/users/${id}`,{
        method:"PUT",
        body: JSON.stringify(feedback),
        headers: { 
          "Content-type": "application/json; charset=UTF-8"
      }
    })

    .then((response) => {getAllFeeback(); editmode=""})
}


getAllFeeback()