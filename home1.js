const formInfo = document.querySelector("#myform");
const listItems = document.getElementById("items");

formInfo.addEventListener("submit", submit);
// listItems.addEventListener("click", deleteItem);
listItems.addEventListener("click", Editbtn);
// // listItems.addEventListener("click", removeItem);

let isEditFlow = false;
let emailList = [];

function submit(e) {
  e.preventDefault();
  formInfo.style.background = "#f4f4f4";
  const email = document.getElementById("inputEmail").value;
  const city = document.getElementById("inputCity").value;
  const password = document.getElementById("inputPassword").value;
  const address = document.getElementById("inputAddress").value;

  if (isEditFlow) {
    // UPDATING IN DATABASE
    fetch(
      `https://crudcrud.com/api/12219d5dc69d41028412a37eeb684d5e/appointmentData/${e.target.parentElement.id}`,
      {
        body: JSON.stringify({
          email,
          address,
          city,
          password,
        }),
        method: "OPTIONS",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        // UPDATING LI ELEMENT
        editLiElement(response._id, response.email, response.city);
        console.log("li udpated successfully : ", response);
      })
      .catch((err) => {
        console.log("Error while udpating the li : ", err);
      });
  } else {
    // ADDING IN DATABASE
      fetch(
        "https://crudcrud.com/api/12219d5dc69d41028412a37eeb684d5e/appointmentData",
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            email,
            address,
            city,
            password,
          }),
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          // CREATING NEW ELEMENT
          let liElement = null;
          // const elementAlreadyExist = localStorage.getItem(email);
    
          liElement = createLiElement(
            response._id,
            response.email,
            response.city,
            response.address,
            response.password
          );
    
          if (liElement !== null) {
            listItems.appendChild(liElement);
          }
          console.log("response saved successfully : ", response);
        })
        .catch((err) => {
          console.log("Error while saving the data : ", err);
        });
  }
}

window.onload = () => {
  fetch(
    "https://crudcrud.com/api/12219d5dc69d41028412a37eeb684d5e/appointmentData",
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log("emailList: ", emailList);
      emailList = response;
      for (let i = 0; i < emailList.length; i++) {
        console.log(" item : ", i);
        if (listItems) {
          listItems.appendChild(
            createLiElement(
              emailList[i]._id,
              emailList[i].email,
              emailList[i].city,
              emailList[i].address,
              emailList[i].password
            )
          );
        } else {
          alert("item list not found");
        }
      }
    })
    .catch((err) => console.log(err));
};

function createLiElement(id, email, city, address, password) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.id = id;
  li.appendChild(document.createTextNode(`* ${email} ${city}`));
  // CREATING NEW DELETE BUTTON IN LI ELEMENT
  li.appendChild(deleteBtn(id));
  li.appendChild(Editbtn(id));
  return li;
}

function editLiElement(id, email, city) {
  const li = document.getElementById(id);
  li.textContent = `* ${email} ${city}`;
  isEditFlow = false;
}

function deleteBtn(id) {
  const deleteBtn = document.createElement("delete");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.id = `${id}_delete`;
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.onclick = (e) => {
    if (e.target.classList.contains("delete")) {
      if (confirm("Are you sure")) {
        fetch(
          `https://crudcrud.com/api/12219d5dc69d41028412a37eeb684d5e/appointmentData/${e.target.parentElement.id}`,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            method: "DELETE",
          }
        )
          .then((res) => {
            const li = e.target.parentElement;
            listItems.removeChild(li);
            console.log("response saved successfully : ", res);
          })
          .catch((err) => {
            console.log("Error while saving the data : ", err);
          });
        // localStorage.removeItem(email);
      }
    }
  };
  return deleteBtn;
}
// defining edit function
function Editbtn(id) {
  let iditem = id;
  const Editbatn = document.createElement("button");
  Editbatn.className = "btn btn-yellow btn-sm float-left Edit";
  Editbatn.id = `${id}_edit`;
  Editbatn.appendChild(document.createTextNode("Edit"));
  Editbatn.onclick = (e) => {
    if (e.target.classList.contains("Edit")) {
      let emailObj = emailList.filter(
        (item) => item._id === e.target.parentElement.id
      )[0];
      document.getElementById("inputEmail").value = emailObj.email;
      document.getElementById("inputCity").value = emailObj.city;
      document.getElementById("inputPassword").value = emailObj.password;
      document.getElementById("inputAddress").value = emailObj.address;
      document.getElementById("inputEmail").focus();
      isEditFlow = true;
      // localStorage.removeItem(email);
    }
  };
  return Editbatn;
}

function resetForm() {
  document.getElementById("inputEmail").value = null;
  document.getElementById("inputCity").value = null;
  document.getElementById("inputPassword").value = null;
  document.getElementById("inputAddress").value = null;
}
