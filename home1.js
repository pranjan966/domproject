const formInfo = document.querySelector("#myform")
const listItems = document.getElementById("items")

formInfo.addEventListener("submit", submit);
// listItems.addEventListener("click", deleteItem);
listItems.addEventListener("click", Editbtn);
// // listItems.addEventListener("click", removeItem);

let targetli = null;
let isEditFlow = false;

function submit(e) {
    e.preventDefault();
    formInfo.style.background = "#f4f4f4";
    const email = document.getElementById("inputEmail").value;
    const city = document.getElementById("inputCity").value;
    const password = document.getElementById("inputPassword").value;
    const address = document.getElementById("inputAddress").value;

    // CREATING NEW ELEMENT
    let liElement = null;
    // const elementAlreadyExist = localStorage.getItem(email);
    if (isEditFlow) {
        liElement = editLiElement(email, city, address, password);
    } else {
        liElement = createLiElement(email, city, address, password);
    }
    if (liElement !== null) {
        listItems.appendChild(liElement)
    }

    // STORE IN LOCAL STORAGE AFTER SUCCESSFULLY ADDED/EDITED
    localStorage.setItem(email, JSON.stringify({
        email,
        address,
        city
    }));
    resetForm();
}

function createLiElement(email, city, address, password) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = email;
    li.appendChild(document.createTextNode(`* ${email} ${city}`));
    // CREATING NEW DELETE BUTTON IN LI ELEMENT
    li.appendChild(deleteBtn(email));
    li.appendChild(Editbtn(email, city, address, password));
    return li;
}

function editLiElement(email, city, address, password) {
    const li = document.getElementById(email);
    li.textContent = `* ${email} ${city}`;
    li.appendChild(deleteBtn(email));
    li.appendChild(Editbtn(email, city, address, password));
    isEditFlow = false;
    return li;
}

function deleteBtn(email) {
    const deleteBtn = document.createElement("delete");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.id = `${email}_delete`;
    deleteBtn.appendChild(document.createTextNode("Delete"))
    deleteBtn.onclick = (e) => {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure')) {
                const li = e.target.parentElement;
                listItems.removeChild(li);
                localStorage.removeItem(email);
            }
        }
    }
    return deleteBtn;
}
// defining edit function
function Editbtn(email, city, address, password) {
    const Editbatn = document.createElement("button");
    Editbatn.className = "btn btn-yellow btn-sm float-left Edit"
    Editbatn.id = `${email}_edit`;
    Editbatn.appendChild(document.createTextNode("Edit"))
    Editbatn.onclick = (e) => {
        if (e.target.classList.contains('Edit')) {
            document.getElementById("inputEmail").value = email;
            document.getElementById("inputCity").value = city;
            document.getElementById("inputPassword").value = password;
            document.getElementById("inputAddress").value = address;
            document.getElementById("inputEmail").focus();
            isEditFlow = true;
            // localStorage.removeItem(email);
        }
    }
    return Editbatn;
}

function resetForm() {
    document.getElementById("inputEmail").value = null;
    document.getElementById("inputCity").value = null;
    document.getElementById("inputPassword").value = null;
    document.getElementById("inputAddress").value = null;
}
