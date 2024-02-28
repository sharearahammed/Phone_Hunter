const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
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
  phoneConainer.textContent = "";

  // Display Show all button if there are more than 9 phones
  const seeAll = document.getElementById("see-all");
  if (phones.length > 9 && !isShowAll) {
    seeAll.classList.remove("hidden");
  } else {
    seeAll.classList.add("hidden");
  }

  // Display only first 9 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  // console.log('is showAll : ',isShowAll);

  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl p-4`;
    // 3 set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
            <button onclick="handleSlowDetails('${phone.slug}');" class="btn btn-primary">Show Details</button>
            </div>
        </div>`;
    phoneConainer.appendChild(phoneCard);
  });
  loading(false);
};

// Show phone Details
const handleSlowDetails = async (id) => {
  // console.log('show details',id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML =
   ` <section>
   <div class ="flex justify-center mb-6">
    <img src="${phone.image}" alt="">
    </div>
    <h3 class="font-bold text-3xl mb-6">${phone.name}</h3>
    <p class="mb-1"><span class="font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
    <p class="mb-1"><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p class="mb-1"><span class="font-bold">
    chipSet: </span>${phone.mainFeatures.chipSet}</p>
    <p class="mb-1"><span class="font-bold">
    Memory: </span>${phone.mainFeatures.memory}</p>
    <p class="mb-1"><span class="font-bold">
    Slug: </span>${phone.slug}</p>
    <p class="mb-1"><span class="font-bold">
    Release date: </span>${phone.releaseDate}</p>
    <p class="mb-1"><span class="font-bold">
    Brand: </span>${phone.brand}</p>
   </section>
    
    `;

  // show the model
  show_details_modal.showModal();
};

// Search button
const searchButton = (isShowAll) => {
  loading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const loading = (isLoading) => {
  const loadingSpainer = document.getElementById("loading");
  if (isLoading) {
    loadingSpainer.classList.remove("hidden");
  } else {
    loadingSpainer.classList.add("hidden");
  }
};

const handleSlowAll = () => {
  searchButton(true);
};

loadPhone();
