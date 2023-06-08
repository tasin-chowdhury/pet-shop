const serverUrl = "http://localhost:3000";

function userRegister() {
  const fullname = document.getElementById('fullname');
  const emailaddress = document.getElementById('emailaddress');
  const password = document.getElementById('password');
  var settings = {
      "url": serverUrl + "/v1/auth/register",
      "method": "POST",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json"
      },
      "data": JSON.stringify({
          "name": fullname.value,
          "email": emailaddress.value,
          "password": password.value,
          "role": "user"
      }),
      success: (result) => {
          // Save access token to localStorage
          localStorage.setItem('access_token', result);
          window.location = 'pages-login.html';
      },
      error: (error) => {
          alert(`Sign up creation failed: ${error.responseJSON.message}`);
          console.log('Sign up errors', error);
      }
  };
  $.ajax(settings).done(function (response) {
      console.log('Successfully login api called');
  });
}


function addProduct() {
  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productPrice = document.getElementById('product-price').value;
  const productPicture = document.getElementById('product-picture').value;
  const productType = document.getElementById('product-type').value;
  const offerPrice = document.getElementById('offer-price').value;
  
  var settings = {
      "url": serverUrl + "/v1/products",
      "method": "POST",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      },
      "data": JSON.stringify({
        "name": productName,
        "price": productPrice,
        "description": productDescription,
        "picture": productPicture,
        "productType": productType,
        "offerPrice": offerPrice
      }),
      success: (result) => {
          // Save access token to localStorage
          console.log('product added')
          window.location =  'dashboard.html';
      },
      error: (error) => {
          alert(`Adding product failed: ${error.responseJSON}`);
          console.log('Adding product failed', error);
      }
  };
  $.ajax(settings).done(function (response) {
      console.log('Successfully login api called');
  });
}

function userLogin() {
  const emailaddress = document.getElementById('emailaddress');
  const password = document.getElementById('password');
  var settings = {
      "url": serverUrl + "/v1/auth/login",
      "method": "POST",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json"
      },
      "data": JSON.stringify({
          "email": emailaddress.value,
          "password": password.value
      }),
      success: (result) => {
          // Save access token to localStorage
          localStorage.setItem('access_token', result.tokens.access.token);
          localStorage.setItem('name', result.user.name);
          localStorage.setItem('email', result.user.email);
          localStorage.setItem('role', result.user.role);
          localStorage.setItem('id', result.user.id);
          window.location = 'dashboard.html';
      },
      error: (error) => {
          alert(`Wrong credentials!: ${error.responseJSON.message}`);
      }
  };
  $.ajax(settings).done(function (response) {
      console.log('Successfully login api called');
  });
}

function getProductDetails(productID) {
  
  var settings = {
      "url": serverUrl + "/v1/products/" + productID,
      "method": "GET",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          
      },
      
      success: (result) => {
        
          document.getElementById('product-name').innerText = result.product.name;
          document.getElementById('product-price').innerText = "BDT " + result.product.price;
          document.getElementById('product-description').innerText = result.product.description;
          document.getElementById('added-date').innerText = "Added date: " + new Date(result.product.createdDate).toLocaleDateString();
          document.getElementById('product-picture').src = result.product.picture;
          
      },
      error: (error) => {
          alert(`Wrong credentials!: ${error.responseJSON.message}`);
      }
  };
  $.ajax(settings).done(function (response) {
      console.log('Successfully login api called');
  });
}


function logout(){
  console.log('Removing access token from localStorage');
  localStorage.removeItem('access_token');
  window.location = 'pages-login.html'
}

function checkAccessToken() {
  let isFound = false;
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    // Access token found, continue loading the current page
    console.log('Access token found!');
    isFound = true;
    // Add your logic to load the current page here
  }
}

function redirectToLoginPage() {
  console.log('Access token not found. Redirecting to page-login.html');
  window.location.href = 'pages-login.html';
}



function getFishFoods() {
      var settings = {
        "url": serverUrl + "/v1/products?productType=fish_food",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        },
        success: function(result) {
            // Generate table rows dynamically based on the response
            const productsTableBody = document.getElementById('products-datatable-fishes');
            result.products.forEach(product => {
                const formattedDate = new Date(product.createdDate).toLocaleDateString();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="${product._id}">
                            <label class="custom-control-label" for="${product._id}">&nbsp;</label>
                        </div>
                    </td>
                    <td>
                        <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
                        <p class="m-0 d-inline-block align-middle font-16">
                            <a href="apps-ecommerce-products-details.html?pid=${product._id}" class="text-body">${product.name}</a>
                            <br />
                            <!-- Add additional product details here -->
                        </p>
                    </td>
                    <td>${product.productType}</td>
                    <td>${formattedDate}</td>
                    <td>$${product.price}</td>
                `;
                productsTableBody.appendChild(row);
            });
        },
        error: function() {
            console.log("Access token missing!");
            redirectToLoginPage();
        }
    };
    $.ajax(settings).done(function(response) {
        // console.log('Successfully got all products');
    });

}


function getBirdFoods() {
  var settings = {
      "url": serverUrl + "/v1/products?productType=bird_food",
      "method": "GET",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      },
      success: function(result) {
          // Generate table rows dynamically based on the response
          const productsTableBody = document.getElementById('products-datatable-birds');

          result.products.forEach(product => {
              const formattedDate = new Date(product.createdDate).toLocaleDateString();
              const row = document.createElement('tr');

              row.innerHTML = `
                  <td>
                      <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="${product._id}">
                          <label class="custom-control-label" for="${product._id}">&nbsp;</label>
                      </div>
                  </td>
                  <td>
                      <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
                      <p class="m-0 d-inline-block align-middle font-16">
                          <a href="apps-ecommerce-products-details.html?pid=${product._id}" class="text-body">${product.name}</a>
                          <br />
                          <!-- Add additional product details here -->
                      </p>
                  </td>
                  <td>${product.productType}</td>
                  <td>${formattedDate}</td>
                  <td>${product.price}</td>
              `;

              productsTableBody.appendChild(row);
          });
      },
      error: function() {
          console.log("Access token missing!");
          redirectToLoginPage();
      }
  };

  $.ajax(settings).done(function(response) {
      console.log('Successfully got all products');
  });
}



function getCatFoods() {
  var settings = {
      "url": serverUrl + "/v1/products?productType=cat_food",
      "method": "GET",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      },
      success: function(result) {
          // Generate table rows dynamically based on the response
          const productsTableBody = document.getElementById('products-datatable-cats');
          result.products.forEach(product => {
              const formattedDate = new Date(product.createdDate).toLocaleDateString();
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>
                      <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="${product._id}">
                          <label class="custom-control-label" for="${product._id}">&nbsp;</label>
                      </div>
                  </td>
                  <td>
                      <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
                      <p class="m-0 d-inline-block align-middle font-16">
                          <a href="apps-ecommerce-products-details.html?pid=${product._id}" class="text-body">${product.name}</a>
                          <br />
                          <!-- Add additional product details here -->
                      </p>
                  </td>
                  <td>${product.productType}</td>
                  <td>${formattedDate}</td>
                  <td>$${product.price}</td>
              `;
              productsTableBody.appendChild(row);
          });
      },
      error: function() {
          console.log("Access token missing!");
          redirectToLoginPage();
      }
  };
  $.ajax(settings).done(function(response) {
      console.log('Successfully got all products');
  });
}

function getDogFoods() {
  var settings = {
      "url": serverUrl + "/v1/products?productType=dog_food",
      "method": "GET",
      "timeout": 0,
      "headers": {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      },
      success: function(result) {
          // Generate table rows dynamically based on the response
          const productsTableBody = document.getElementById('products-datatable-dogs');
          result.products.forEach(product => {
              const formattedDate = new Date(product.createdDate).toLocaleDateString();
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>
                      <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="${product._id}">
                          <label class="custom-control-label" for="${product._id}">&nbsp;</label>
                      </div>
                  </td>
                  <td>
                      <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
                      <p class="m-0 d-inline-block align-middle font-16">
                          <a href="apps-ecommerce-products-details.html?pid=${product._id}" class="text-body">${product.name}</a>
                          <br />
                          <!-- Add additional product details here -->
                      </p>
                  </td>
                  <td>${product.productType}</td>
                  <td>${formattedDate}</td>
                  <td>$${product.price}</td>
              `;
              productsTableBody.appendChild(row);
          });
      },
      error: function() {
          console.log("Access token missing!");
          redirectToLoginPage();
      }
  };
  $.ajax(settings).done(function(response) {
      console.log('Successfully got all products');
  });
}




function getAllProducts() {
  var settings = {
    "url": serverUrl + "/v1/products",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
    },
    success: function (result) {
     
      // Generate table rows dynamically based on the response
      const productsTableBody = document.getElementById('products-datatable');
      const shopByAnimal = document.getElementById("shop-by-pet");

      // const cardDeck = document.querySelector('.card-deck');
      products.forEach(product => {
        const { _id, picture, name, productType, price } = product;
      
        const card = document.createElement("div");
        card.classList.add("card", "d-block");
      
        card.innerHTML = `
        <div class="card d-block">
        <img class=" card-img-top"
            src="${picture}"
            alt="Card image cap">
        <div class="card-body">
            <a href="cat-products-user.html" class="decoration-none">
                <h5 class="card-title text-center underline ">${name}</h5>
            </a>
        </div>
    </div> <!-- end card-->
        `;
      
        shopByAnimal.appendChild(card);
      });

      result.products.forEach(product => {
        const formattedDate = new Date(product.createdDate).toLocaleDateString();
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="${product._id}">
              <label class="custom-control-label" for="${product._id}">&nbsp;</label>
            </div>
          </td>
          <td>
            <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
            <p class="m-0 d-inline-block align-middle font-16">
              <a href="apps-ecommerce-products-details.html" class="text-body">${product.name}</a>
              <br />
              <!-- Add additional product details here -->
            </p>
          </td>
          <td>${product.productType}</td>
          <td>${formattedDate}</td>
          <td>$${product.price}</td>
        `;

        productsTableBody.appendChild(row);
      });
    },
    error: function () {
      console.log("Access token missing!");
      redirectToLoginPage();
    }
  };

  $.ajax(settings).done(function (response) {
    console.log('Successfully got all products');
  });
}



function getAllServices() {
  var settings = {
    "url": serverUrl + "/v1/services/",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
    },
    success: function (result) {
      console.log('services', result.services);
      // Generate table rows dynamically based on the response
      // Get the container element
        const cardDeck = document.getElementById('service-deck');
        // const cardDeck = document.querySelector(".card-deck");

      // Iterate over the API response and create the dynamic HTML elements
      result.services.forEach((service) => {
        const { _id, image, name, type, price } = service;
          const card = document.createElement("div");
          card.classList.add("card", "d-block");

          card.innerHTML = `
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title text-center underline">${name}</h5>
            </div>
          `;
          cardDeck.appendChild(card);
      });
    },
    error: function () {
      console.log("Access token missing!");
      redirectToLoginPage();
    }
  };

  $.ajax(settings).done(function (response) {
    console.log('Successfully got all services');
  });
}





document.getElementById('user-name').innerText = localStorage.getItem('name');
document.getElementById('user-role').innerText = localStorage.getItem('role');
if(localStorage.getItem('role') === 'user') document.getElementById('add-product').remove();