const loadAllPhones = () =>{
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    searchBox.value = '';
}
const loadDisplayPhones = phones =>{
    <div id="search-result" class="row row-cols-1 row-cols-md-3 g-4">
    </div>
}