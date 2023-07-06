const formInfo = document.querySelector("#myform")
const listItems = document.getElementById("items")




formInfo.addEventListener("submit", submit);
// // listItems.addEventListener("click", removeItem);

function submit(e) {
    e.preventDefault();
    const email = document.getElementById("inputEmail").value
    const city = document.getElementById("inputCity").value
    console.log(email, city)
    // localStorage.setItem("user_email", email)
    const email_serialised = JSON.stringify(email)
    localStorage.setItem("email", email_serialised)
    const email_deserialized = JSON.parse(localStorage.getItem("email"))
    console.log(email_deserialized)


    // newItem = document.getElementById("items").value;
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.appendChild(document.createTextNode(`* ${email} ${city}`))


    listItems.appendChild(li)




}