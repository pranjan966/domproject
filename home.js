const formInfo = document.querySelector("#myform")
const listItems = document.getElementById("items")





formInfo.addEventListener("submit", submit);
listItems.addEventListener("click", deleteItem);
listItems.addEventListener("click", Editbtn);
// // listItems.addEventListener("click", removeItem);

function submit(e) {
    e.preventDefault();
    formInfo.style.background = "#f4f4f4"
    const email = document.getElementById("inputEmail").value;
    const city = document.getElementById("inputCity").value;
    const password = document.getElementById("inputPassword").value;
    const address = document.getElementById("inputAddress").value;




    const myObj = {
        email: `${email}`,
        city: `${city}`
    }
    //    STORE IN LOCAL STORAGE
    // localStorage.setItem("user_email", email)
    // const myObj_serialised = JSON.stringify(myObj)
    // localStorage.setItem(email, myObj_serialised)
    // const myObj_deserilized = JSON.parse(localStorage.getItem(myObj))
    // console.log(myObj_deserilized)
    fetch('https://crudcrud.com/api/17d433c80ab54cf0a46a7b8dc7e38958/appointmentData', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(myObj),
        method: 'POST'
    })
    .then(res => {
        console.log('response saved successfully : ', res);
    })
    .catch(err => {
        console.log('Error while saving the data : ', err);
    })

    // CREATING NEW ELEMENT
    // newItem = document.getElementById("items").value;
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.appendChild(document.createTextNode(`* ${email} ${city}`))
    // CREATING NEW DELETE BUTTON IN LI ELEMENT
    const deleteBtn = document.createElement("delete");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.id = email
    deleteBtn.appendChild(document.createTextNode("Delete"))
    deleteBtn.onclick = (e) => {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure')) {
                //
                const li = e.target.parentElement;
                listItems.removeChild(li);
                // localStorage.removeItem(myObj.email);

            }

        }


    }
    li.appendChild(deleteBtn)

    // CREATING EDIT BTN IN LI ELEMENT
    const Editbatn = document.createElement("button");
    Editbatn.className = "btn btn-yellow btn-sm float-left Edit"
    Editbatn.appendChild(document.createTextNode("Edit"))
    Editbatn.onclick = (e) => {
        if (e.target.classList.contains('Edit')) {
            document.getElementById("inputEmail").value = email;
            document.getElementById("inputCity").value = city;
            document.getElementById("inputPassword").value = password;
            document.getElementById("inputAddress").value = address;



            //
            const li = e.target.parentElement;
            // listItems.removeChild(li);
            // localStorage.removeItem(myObj.email) ;



        }

    }
    li.appendChild(Editbatn)



    listItems.appendChild(li)




}
// defining delete function

function deleteItem(e) {

    // const email = document.getElementById("inputEmail").value
    // const city = document.getElementById("inputCity").value
    // const myObj = {
    //     email: email,
    //     city: city
    // }



}
// defining edit function
function Editbtn(e) {
    const email = document.getElementById("inputEmail").value
    const city = document.getElementById("inputCity").value



}
