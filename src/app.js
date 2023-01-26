class Request {
  constructor(url) {
    this.url = url;
  }
  async get(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Reçeteler Yüklenemedi. ${res.status}`);
    }
    const resData = await response.json();
    return resData;
  }
  async post(data) {
    const response = await fetch(this.url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await response.json();
    return resData;
  }
  async put(id, data) {
    const response = await fetch(`${this.url}${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await response.json();
    return resData;
  }
  async delete(id) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
    const resData = await response.json();
    return resData;
  }
}

const request = new Request("http://localhost:3000/Blogs/");

blogUI();
function blogUI() {
  request
    .get("http://localhost:3000/Blogs/")
    .then((data) => {
      data.forEach((blog) => {
        let metin = blog.content;
        metin = metin.substring(0, 85);
        console.log(blog);
        ui.innerHTML += `          
            <div class="col-12 col-sm-4 col-md-3 d-flex justify-content-center align-items-center">
              <div class="card border-0 my-5">
              <button type="button" class="btn text-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvasOptions" aria-controls="offcanvasOptions" onClick="formEditIcon(${blog.id})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </button>           
                <img src="${blog.image}" title=" ${blog.check}" class="card-img-top" alt="${blog.name}" />
                <div class="card-body">
                  <h4 class="card-title text-center">${blog.name}</h4>
                  <h5 pt-4" >${blog.nick}</h5>
                  <p class="card-text">${metin}.....</p> 
                  <div class="d-flex justify-content-between">
                    <p class="card-text text-start"><b>Detay: ${blog.price}</b></p>                 
                    <p class="category card-text text-end">${blog.category}</p>
                  </div>            
                  <p class="card-text" >Yazar: ${blog.author}</p>
                  <h6 class="text-center">${blog.date}</h6>
                  <h6 class="text-center">${blog.datee}</h6>
                  

                  <div
                      class="text-center mt-4 mb-3 text-light" 
                      style="background-color : ${blog.check ? "#32CD32" : "#ff0022"};">           
                      ${blog.check ? "Tamamlandı" : "Tamamlanmadı"}
                  </div>

                  <div class="d-flex justify-content-between mt-1">
                    <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Modal-${blog.id}">İncele</button>      
                    <button class="btn">${blog.id}</button>
                    <button id="${blog.id}" class="btn btn-danger m-0 delete" onClick="deleteBlog(${blog.id})">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 
                        1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg>
                    </button>                                                      
                  </div>
                    
                  
                </div>
              </div>
            </div>


            <div class="modal fade" id="Modal-${blog.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">${blog.category}</h5>
                  <button type="button" class="close border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="abc" class="modal-body">
                <div class="card-body">
                <img src="${blog.image}" class="card-img-top" alt="${blog.name}" />
                  <h4 class="card-title text-center" contenteditable="true">${blog.name}</h4>
                  <h5 pt-4" contenteditable="true">${blog.nick}</h5>
                  <p class="card-text" contenteditable="true">${blog.content}</p>                  
                </div>
                </div>
                <div class="modal-footer d-flex justify-content-between ">
                <p class="card-text text-end py-0" contenteditable="true">Yazar: ${blog.author}</p>               
                <h6 class="text-center" contenteditable="true">${blog.date}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          `;
      });
    })
    .catch((err) => console.log(err));
}


const blogAdd = document.querySelector("#blog-add");
blogAdd.addEventListener("click", formAdd);

function formAdd(e) {
  e.preventDefault();
  let tarih = new Date();
  const newPost = {
    check: `${document.getElementById("myCheck").checked}` === "true" && true,
    name: `${document.getElementById("name").value}`,
    nick: `${document.getElementById("nick").value}`,
    content: `${document.getElementById("content").value.trim()}`,
    author: `${document.getElementById("author").value}`,
    date: `${document.getElementById("date").value}`,
    category: `${document.getElementById("category").value}`,
    image: `${document.getElementById("image-url").value}`,
    price: `${document.getElementById("price").value}`,
    datee: `${tarih.getDate()}/${tarih.getMonth() + 1}/${tarih.getFullYear()}-${tarih.getHours()}:${tarih.getMinutes()}`,
  };
  console.log(newPost);

  request
    .post(newPost)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

const blogEdit = document.querySelector("#blogEdit");
blogEdit.addEventListener("click", formEdit);

function formEdit(e) {
  let tarih = new Date();
    request 
    .put(idChanged, {
    check: `${document.getElementById("myCheck").checked}` === "true" && true,
    name: `${document.getElementById("name").value}`,
    nick: `${document.getElementById("nick").value}`,
    content: `${document.getElementById("content").value.trim()}`,
    author: `${document.getElementById("author").value}`,
    date: `${document.getElementById("date").value}`,
    category: `${document.getElementById("category").value}`,
    image: `${document.getElementById("image-url").value}`,
    price: `${document.getElementById("price").value}`,
    datee: `${tarih.getDate()}/${tarih.getMonth() + 1}/${tarih.getFullYear()}-${tarih.getHours()}:${tarih.getMinutes()}`,
  })
  console.log(idChanged);
  request
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
    e.preventDefault();
}


let idChanged;
function formEditIcon(editId) {
  request
    .get("http://localhost:3000/Blogs/")
    .then((responseJson)=>{
      responseJson.forEach(function(blog){
        if(editId==blog.id)
        {          
          idChanged = blog.id;
          document.getElementById("myCheck").checked = blog.check;
          document.getElementById("name").value = blog.name;
          document.getElementById("nick").value = blog.nick;
          document.getElementById("content").value = blog.content;
          document.getElementById("author").value = blog.author;
          document.getElementById("date").value = blog.date;
          document.getElementById("category").value = blog.category;
          document.getElementById("image-url").value = blog.image;
          document.getElementById("price").value = blog.price;        
        };
      })
    })
    .catch((err) => console.log(err));
    blogAdd.style = "display:none";
    blogEdit.style.display="inline-block";
}

function deleteBlog(removeId) {
  if (confirm("Kalıcı olarak silmek istediğinize emin misiniz?")) {
    request
      .delete(removeId)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    displayMessage("Silme işlemi başarılı", "success");
    setTimeout(() => {}, 9000);
  }
}

function filterItemsOnUI(filterValue, filterTitles) {
  filterTitles.forEach(function (filterTitle) {
    const text = filterTitle.innerText.toLowerCase();
    console.log(text);
    if (text.indexOf(filterValue) === -1) {
      filterTitle.parentElement.parentElement.parentElement.setAttribute(
        "style",
        "display:none !important"
      );
    } else {
      filterTitle.parentElement.parentElement.parentElement.setAttribute(
        "style",
        "display:block"
      );
    }
  });
}

const searchTerm = document.getElementById("searchTerm");
searchTerm.addEventListener("keyup", filterItems);
function filterItems(e) {
  const filterValue = e.target.value.toLowerCase();
  const filterTitles = document.querySelectorAll(".card-title");
  filterItemsOnUI(filterValue, filterTitles);
}

const filterCategory = document.getElementById("filterCategory");
filterCategory.addEventListener("change", filterCategoryfunc);
function filterCategoryfunc(e) {
  const filterCategory = document.querySelectorAll(".category");
  const filterValue = e.target.value.toLowerCase();
  filterCategoryUI(filterCategory, filterValue);
}

function filterCategoryUI(filterCategory, filterValue) {
  filterCategory.forEach(function (category) {
    const text = category.innerHTML.toLowerCase();
    if (filterValue == "seciniz") {
      category.parentElement.parentElement.parentElement.parentElement.setAttribute(
        "style",
        "display:table-row"
      );
    } else {
      if (text.indexOf(filterValue) === -1) {
        category.parentElement.parentElement.parentElement.parentElement.setAttribute(
          "style",
          "display:none !important"
        );
      } else {
        category.parentElement.parentElement.parentElement.parentElement.setAttribute(
          "style",
          "display:table-row"
        );
      }
    }
  });
}


function displayMessage(message, type) {
  const cardBody = document.querySelector("#status");
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  cardBody.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 9000);
}