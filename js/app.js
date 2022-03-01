// Spinner Function 
const spinner = toggole => {
  return (document.getElementById("spinner").style.display = toggole);
}
// Error Message Function 
const inputError = (id, display) => {
  document.getElementById(id).style.display = display;
}
// load all phone data 
const loadAllPhones = () =>{
    document.getElementById('search-result').textContent = '';
    document.getElementById('phone-details').textContent = '';
    spinner('block');
    
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    // empty error function 
    if (searchText === "") {
      inputError("empty-error", "block");
      inputError("number-error", "none");
      spinner("none");
      return;
    }
    // number error function 
    if (isNaN(searchText) === false) {
      inputError("number-error", "block");
      inputError("empty-error", "none");
      spinner("none");
      searchBox.value = '';
      return;
    }
    // data fetching
    else if(searchText !== ""){
      inputError("number-error", "none");
      inputError("empty-error", "none");
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
      fetch(url)
      .then(res => res.json())
      .then(data => loadDisplayPhones(data.data.slice(0,20)))
      searchBox.value = '';
    }
}
// show all phones in display
const loadDisplayPhones = phones =>{
  document.getElementById("spinner").style.display = "none";
    const phoneContainer = document.getElementById('search-result');
    // unknown error function 
    if(phones.length == 0){
      document.getElementById('unknown-error').style.display = 'block';
    }else{
      document.getElementById('unknown-error').style.display = 'none';
    }
    // all phone data looping
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img class="w-50 mx-auto pt-3" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body text-center ">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6 class="card-text">${phone.brand}</h6>
                    <button  onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
            `;
            phoneContainer.appendChild(div);
    });
}

// load single phone details  
const loadPhoneDetails = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
// show single phone details 
const displayPhoneDetails = singlePhone =>{
  document.getElementById('phone-details').textContent = '';
    window.scroll(0, 50);
    const detailsPhoneDiv = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 phone-details mx-auto">
        <img class="w-50 mx-auto pt-3" src="${singlePhone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${singlePhone.name}</h5>
    <table class="table">
  <tbody>
    <tr>
      <th scope="row">Brand</th>
      <td>${singlePhone.brand}</td>
    </tr>
    <tr>
      <th scope="row">Realase Date</th>
      <td>${singlePhone.releaseDate ? singlePhone.releaseDate: 'No Release Date Found' }</td>
    </tr>
    <tr>
      <th scope="row">Storage</th>
      <td>${singlePhone.mainFeatures.storage}</td>
    </tr>
    <tr>
      <th scope="row">Display</th>
      <td>${singlePhone.mainFeatures.displaySize}</td>
    </tr>
    <tr>
      <th scope="row">Chipset</th>
      <td>${singlePhone.mainFeatures.chipSet}</td>
    </tr>
    <tr>
      <th scope="row">Memory</th>
      <td>${singlePhone.mainFeatures.memory}</td>
    </tr>
    <tr>
      <th scope="row">Chipset</th>
      <td>${singlePhone.mainFeatures.chipSet}</td>
    </tr>
    <tr>
      <th scope="row" rowspan="6">Others</th>
      <td><span class="fw-bold">Bluetooth:</span> ${singlePhone.others?.Bluetooth ? singlePhone.others.Bluetooth: "Bluetooth info is Not Available"}</td>
      <tr>
      <td><span class="fw-bold">GPS:</span> ${singlePhone.others?.GPS ? singlePhone.others.GPS: "GPS info is Not Available"}</td>
      </tr>
      <tr>
      <td><span class="fw-bold">NFC:</span> ${singlePhone.others?.NFC ? singlePhone.others.NFC: "NFC info is Not Available"}</td>
      </tr>
      <tr>
      <td><span class="fw-bold">Radio:</span> ${singlePhone.others?.Radio ? singlePhone.others.Radio: "Radio info is Not Available"}</td>
      </tr>
      <tr>
      <td><span class="fw-bold">USB:</span> ${singlePhone.others?.USB ? singlePhone.others.USB: "USB info is Not Available"}</td>
      </tr>
      <tr>
      <td><span class="fw-bold">WLAN:</span> ${singlePhone.others?.WLAN ? singlePhone.others.WLAN: "WLAN info is Not Available"}</td>
      </tr>
    </tr>
  </tbody>
</table>
<p class="card-text"><span class="fw-bold">Sensors: </span> ${singlePhone.mainFeatures.sensors}</p>
            </div>
        `;
    detailsPhoneDiv.appendChild(div);
}