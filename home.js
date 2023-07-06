const formInfo = document.querySelector("#myform")
const listItems = document.getElementById("items")





formInfo.addEventListener("submit", submit);
listItems.addEventListener("click", deleteItem)
// // listItems.addEventListener("click", removeItem);

function submit(e) {
    e.preventDefault();
    formInfo.style.background = "#f4f4f4"
    const email = document.getElementById("inputEmail").value
    const city = document.getElementById("inputCity").value

    const myObj = {
        email: `${email}`,
        city: `${city}`
    }
    // console.log(myObj)
    // localStorage.setItem("user_email", email)
    const myObj_serialised = JSON.stringify(myObj)


    localStorage.setItem(`${email}`, myObj_serialised)
    const myObj_deserilized = JSON.parse(localStorage.getItem(myObj))
    console.log(myObj_deserilized)


    // newItem = document.getElementById("items").value;
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.appendChild(document.createTextNode(`* ${email} ${city}`))
    const deleteBtn = document.createElement("delete");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode("Delete"))
    li.appendChild(deleteBtn)



    listItems.appendChild(li)




}
function deleteItem(e) {
    const email = document.getElementById("inputEmail").value
    const city = document.getElementById("inputCity").value
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure')) {

            const li = e.target.parentElement;
            listItems.removeChild(li);
            localStorage.removeItem(`${email}`);
        }
    }

}
