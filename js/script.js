// variable
let name = document.querySelector(".name");
let name_err = document.querySelector(".name-err");
let email = document.querySelector(".email");
let mail_err = document.querySelector(".mail-err");
let password = document.querySelector(".password");
let pass_err = document.querySelector(".pass-err");
let confirm_pass = document.querySelector(".confirm-pass");
let confirm_pass_err = document.querySelector(".confirm-pass-err");
let country_name = document.querySelector(".country-name");
let country_name_err = document.querySelector(".country-name-err");

// Button variable

let find = document.querySelector(".find");
let submit_btn = document.querySelector(".submit-button");

//register button start
submit_btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (name.value === "" || /\d/.test(name)) {
    name_err.textContent = "Please enter your name";
    name.style.borderColor = "#ff5e5e";
    return false;
  } else {
    name_err.textContent = "";
    name.style.borderColor = "#d4d4d4";
  }
  if (email.value === "") {
    mail_err.textContent = "Please enter your name";
    email.style.borderColor = "#ff5e5e";
    return false;
  } else {
    mail_err.textContent = "";
    email.style.borderColor = "#d4d4d4";
  }

  //   Password start
  if (password.value === "") {
    pass_err.textContent = "Enter your password";
    password.style.borderColor = "#ff5e5e";
  } else {
    pass_err.textContent = "";
    if (password.value.length < 8 || password.value.length > 15) {
      pass_err.textContent =
        "Password should be at least 15 characters OR at least 8 characters including a number, symbol and a lowercase letter.";
      password.style.borderColor = "#ff5e5e";
      return true;
    }
    password.style.borderColor = "#d4d4d4";
  }

  if (confirm_pass.value === "") {
    confirm_pass_err.textContent = "Enter your password";
    confirm_pass.style.borderColor = "#ff5e5e";
    if (password.value === confirm_pass.value) {
      confirm_pass_err.textContent = "";
      confirm_pass.style.borderColor = "#d4d4d4";
      return false;
    } else {
      confirm_pass_err.textContent = "Password not match";
      confirm_pass.style.borderColor = "#ff5e5e";
      return false;
    }
  } else {
    confirm_pass_err.textContent = "";
    confirm_pass.style.borderColor = "#d4d4d4";
  }

  //   password end

  //Country
  if (country_name.value === "") {
    country_name_err.textContent = "Please enter a country name";
    country_name.style.borderColor = "#ff5e5e";
    return false;
  } else {
    country_name_err.textContent = "";
    country_name.style.borderColor = "#d4d4d4";
  }
  location.reload();
});

function countryName(country_name) {
  let innApi = `https://restcountries.com/v3.1/name/${country_name}`;

  fetch(innApi)
    .then((data) => data.json())
    .then((main_data) => {
      let [getDataStore] = main_data;
      common_html(getDataStore);
    })
    .catch((error) => {
      console.log(error);
    });
}

function common_html(getDataStore) {
  let country_info_main = document.querySelector(".country_info_main");
  let currency = Object.keys(getDataStore.currencies)[0];

  let renders = `
 <div class="country_information">
    <div class="country_img">
        <img src=${getDataStore.flags?.svg} alt="" />
    </div>
      <div class="country_content">
        <h4>${getDataStore.name.common}</h4>
        <p class="population">Population: ${formateNumber(
          getDataStore.population
        )}</p>
        <p class="borders">Borders: ${getDataStore?.borders}</p>
        <p class="currency">Currency: ${currency}</p>
        <p class="capital">Capital: ${getDataStore.capital}</p>
        <p class="area">Area: ${getDataStore.area} square kilometres</p>
      </div>
  </div> 

`;
  country_info_main.innerHTML = renders;
}

find.addEventListener("click", (event) => {
  event.preventDefault();
  let countryMain = document.querySelector("#country_input").value;
  if (countryMain == "") {
    country_name_err.innerHTML = "Enter your countiry name";
  } else {
    country_name_err.innerHTML = "";
    countryName(countryMain);
  }
});

function formateNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else {
    return num.toString();
  }
}

//register button end
