const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  // console.log(data.data);
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)

  const phoneConainer = document.getElementById("phone-container");
//   clear phoneConainer cards before adding new cards
phoneConainer.textContent = '';

// Display Show all button if there are more than 9 phones
const seeAll = document.getElementById('see-all');
if(phones.length > 9 && !isShowAll){
    seeAll.classList.remove('hidden');
}
else{
    seeAll.classList.add('hidden');
}

// Display only first 9 phones if not show all
if(!isShowAll){
    phones = phones.slice(0,9);
}
console.log('is showAll : ',isShowAll);

  phones.forEach( phone => {
    console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl p-4`;
    // 3 set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>`;
        phoneConainer.appendChild(phoneCard);
  });
  loading(false);
};


// Search button
const searchButton = (isShowAll) => {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText , isShowAll);
}


const loading = (isLoading) => {
    const loadingSpainer = document.getElementById('loading');
    if(isLoading){
        loadingSpainer.classList.remove('hidden');
    }
    else{
        loadingSpainer.classList.add('hidden');
    }
}

const handleSlowAll = () => {
    searchButton(true);
}
