const serverUrl = "http://localhost:3000";

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
            window.location = 'login.html';
        },
        error: () => {
            alert("Wrong credentials!");
        }
    };

    $.ajax(settings).done(function (response) {
        console.log('Successfully login api called');
    });
}


// function getAllProducts() {
//     var settings = {
//       "url": serverUrl + "/v1/products",
//       "method": "GET",
//       "timeout": 0,
//       "headers": {
//         "accept": "application/json",
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
//       },
//       success: function (result) {
//         // console.log('result', result.products);
//         // Generate table rows dynamically based on the response
//         const productsTableBody = document.getElementById('products-datatable');


//         result.products.forEach(product => {
//           const formattedDate = new Date(product.createdDate).toLocaleDateString();
//           const row = document.createElement('tr'); 

//           row.innerHTML = `
//             <td>
//               <div class="custom-control custom-checkbox">
//                 <input type="checkbox" class="custom-control-input" id="${product._id}">
//                 <label class="custom-control-label" for="${product._id}">&nbsp;</label>
//               </div>
//             </td>
//             <td>
//               <img src="${product.picture}" alt="contact-img" title="contact-img" class="rounded mr-3" height="100" />
//               <p class="m-0 d-inline-block align-middle font-16">
//                 <a href="apps-ecommerce-products-details.html" class="text-body">${product.name}</a>
//                 <br />
//                 <!-- Add additional product details here -->
//               </p>
//             </td>
//             <td>${product.productType}</td>
//             <td>${formattedDate}</td>
//             <td>$${product.price}</td>
//           `;

//           productsTableBody.appendChild(row);
//         });
//       },
//       error: function () {
//         alert("Access token missing!");
//       }
//     };

//     $.ajax(settings).done(function (response) {
//       console.log('Successfully got all products');
//     });
//   }



 // Call getAllProducts() when the page loads
//  window.onload = function () {
//     getAllProducts();
//   };