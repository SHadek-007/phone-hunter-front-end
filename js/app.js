const loadAllPhones = () =>{
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => loadDisplayPhones(data.data))
    searchBox.value = '';
}
const loadDisplayPhones = phones =>{
    const phoneContainer = document.getElementById('search-result');
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
const loadPhoneDetails = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}
