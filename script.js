"use strict";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const account1 = {
  name: "Alina Castaneda",
  email: "alinacasta@gmail.com",
  username: "alinacasta",
  password: "ac123",
  img: "alina",
  actions: [
    {
      name: "4 Families House Tour",
      price: "1000",
      date: "2020-07-15",
      type: "expense",
    },
    {
      name: "Luxury Condo Sale",
      price: "2500000",
      date: "2021-09-20",
      type: "profit",
    },
    {
      name: "Commercial Property Lease",
      price: "5000",
      date: "2022-03-10",
      type: "profit",
    },
    {
      name: "Marketing Campaign",
      price: "3000",
      date: "2022-08-05",
      type: "expense",
    },
    {
      name: "Residential Property Sale",
      price: "1500000",
      date: "2023-01-25",
      type: "profit",
    },
    {
      name: "Office Rent",
      price: "4000",
      date: "2023-06-12",
      type: "expense",
    },
  ],
};

const account2 = {
  name: "John Smith",
  email: "johnsmith@gmail.com",
  username: "johnsmith",
  password: "js123",
  img: "john",
  actions: [
    {
      name: "Apartment Showing",
      price: "800",
      date: "2021-07-10",
      type: "expense",
    },
    {
      name: "Commercial Building Sale",
      price: "4000000",
      date: "2022-11-05",
      type: "profit",
    },
    {
      name: "Property Renovation",
      price: "10000",
      date: "2022-12-20",
      type: "expense",
    },
  ],
};

const account3 = {
  name: "Emma Davis",
  email: "emmadavis@gmail.com",
  username: "emmadavis",
  password: "ed123",
  img: "emma",
  actions: [
    {
      name: "Residential Property Sale",
      price: "1200000",
      date: "2020-09-10",
      type: "profit",
    },
    {
      name: "Property Maintenance",
      price: "500",
      date: "2021-02-15",
      type: "expense",
    },
    {
      name: "Commercial Building Lease",
      price: "6000",
      date: "2022-06-05",
      type: "profit",
    },
    {
      name: "Digital Marketing Campaign",
      price: "3000",
      date: "2023-01-20",
      type: "expense",
    },
  ],
};

const account4 = {
  name: "Sophia Johnson",
  email: "sophiajohnson@gmail.com",
  username: "sophiajohnson",
  password: "sj123",
  img: "sophia",
  actions: [
    {
      name: "Apartment Rental",
      price: "1500",
      date: "2020-12-05",
      type: "profit",
    },
    {
      name: "Property Inspection",
      price: "200",
      date: "2021-03-20",
      type: "expense",
    },
    {
      name: "Land Development Project",
      price: "50000",
      date: "2022-09-15",
      type: "profit",
    },
    {
      name: "Advertising Campaign",
      price: "2500",
      date: "2023-04-10",
      type: "expense",
    },
    {
      name: "Commercial Property Sale",
      price: "1800000",
      date: "2023-07-01",
      type: "profit",
    },
  ],
};

const accounts = [account1, account2, account3, account4];

const signInBtn = document.querySelector(".signin-button");
const navLinks = document.querySelectorAll(".menu__list__item");
const logoutBtn = document.getElementById("logout");

const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalNameInput = document.getElementById("actionName");
const modalPriceInput = document.getElementById("actionPrice");
const modalDateInput = document.getElementById("actionDate");
const modalTypeInput = document.getElementById("actionType");
const submitBtn = document.querySelector(".submit");
const addBtn = document.querySelector(".add__btn");
const closeBtn = document.querySelector(".close__btn");

const app = document.querySelector(".app");
const signInForm = document.querySelector(".signin-form");
const profileSection = document.querySelector(".profile__section");
const mainSection = document.querySelector(".main__section");

const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const salesListEl = document.querySelector(".sales__list");

const totalProfitEl = document.getElementById("total-profit");
const recentProfitEl = document.getElementById("recent-profit");
const totalSalesEl = document.getElementById("total-sales");
const perYearEl = document.getElementById("per-year");
const perSelEl = document.getElementById("per-sell");

const profileSectionName = document.querySelector(".profile__section__name");
const profileSectionUserName = document.querySelector(
  ".profile__section__username"
);
const profileSectionPassword = document.querySelector(
  ".profile__section__password"
);

const profileName = document.querySelector(".profile__name");
const profileEmail = document.querySelector(".profile__email");
const profilePicture = document.querySelector(".profile__picture");

let currentAccount = account4;

const displaySales = (actions) => {
  salesListEl.innerHTML = "";

  actions.forEach((action) => {
    const html = `<li class="${action.type}">
    <span class="sale__name">${action.name}</span>
    <span class="sale__price">$${action.price}</span>
    <span class="sale__date">${displayDate(action.date)}</span>
    <button class="delete__btn">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </li>`;

    salesListEl.innerHTML += html;
  });
};

const displayProfileInfo = (account) => {
  profileName.textContent = account.name;
  profileEmail.textContent = account.email;
  profilePicture.style.backgroundImage = `url("Images/${account.img}.jpg")`;
};

const displayProfileBalance = (account) => {
  profileSectionName.textContent = account.name;
  profileSectionUserName.textContent = account.username;
  profileSectionPassword.textContent = account.password;

  // Calculating total profit
  const profits = account.actions.filter((action) => action.type === "profit");
  const totalProfits = profits.reduce(
    (sum, profit) => (sum += +profit.price),
    0
  );

  // Calculating recent profit
  const recentProfits = account.actions.filter(
    (action) => action.type === "profit" && action.date.slice(0, 4) === "2023"
  );
  const totalRecentProfits = recentProfits.reduce(
    (sum, profit) => (sum += +profit.price),
    0
  );

  // Calculating recent expenses
  const recentExpenses = account.actions.filter(
    (action) => action.type === "expense" && action.date.slice(0, 4) === "2023"
  );

  const totalRecentExpenses = recentExpenses.reduce(
    (sum, profit) => (sum += +profit.price),
    0
  );

  // // Calculating total expense
  const expenses = account.actions.filter(
    (action) => action.type === "expense"
  );
  const totalExpenses = expenses.reduce(
    (sum, expense) => (sum += +expense.price),
    0
  );

  // Calucating recent balance

  const recentBalance = totalRecentProfits - totalRecentExpenses;

  // Calculating balance
  const balance = totalProfits - totalExpenses;

  const activeYears = new Set(
    account.actions.map((action) => {
      return action.date.slice(0, 4);
    })
  );

  // Calculating per year income
  const profitPerYear = balance / activeYears.size;

  // Displaying html content
  totalProfitEl.textContent = `$${balance}`;
  perYearEl.textContent = `average profit per year ${profitPerYear}$`;
  totalSalesEl.textContent = profits.length;
  recentProfitEl.textContent = `$${recentBalance}`;
  perSelEl.textContent = `average profit per sell ${
    recentProfits.length > 0 ? recentBalance / recentProfits.length : 0
  }$`;
};

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    for (const navLink of navLinks) {
      navLink.classList.remove("active");
    }

    searchInput.value = "";

    this.classList.add("active");

    
    if (this.id === "home") {
      displaySales(currentAccount.actions);
      displayProfileInfo(currentAccount);
      searchForm.classList.remove("hidden");
      addBtn.classList.remove("hidden");
    } else {
      searchForm.classList.add("hidden");
      addBtn.classList.add("hidden");
    }


    if (this.id === "sells") {
      displaySales(
        currentAccount.actions.filter((action) => action.type === "profit")
        
      );
      searchForm.classList.remove("hidden");
      addBtn.classList.remove("hidden");
    }

    if (this.id === "recents") {
      displaySales(currentAccount.actions.slice(0, 4));
    }

    if (this.id === "profile") {
      mainSection.classList.add("hidden");
      profileSection.classList.remove("hidden");
      displayProfileBalance(currentAccount);
    } else {
      mainSection.classList.remove("hidden");
      profileSection.classList.add("hidden");
    }
  });
});

logoutBtn.addEventListener("click", () => {
  app.classList.add("hidden");
  signInForm.classList.remove("hidden");
});

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === userNameInput.value
  );

  if (currentAccount.password === passwordInput.value) {
    app.classList.remove("hidden");
    signInForm.classList.add("hidden");
    mainSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
    searchInput.classList.remove("hidden");

    displaySales(currentAccount.actions);
    displayProfileInfo(currentAccount);
  }

  passwordInput.value = "";
  userNameInput.value = "";
});

const displayDate = (date) => {
  const [year, month, day] = date.split("-");

  if (month[0] === 0) {
    return `${months[month.slice(-1) - 1]} ${day} ${year}`;
  } else {
    return `${months[month - 1]} ${day} ${year}`;
  }
};

searchInput.addEventListener("input", (event) => {
const searchedActions = currentAccount.actions.filter((action) => {
  return (action.name.toLowerCase().includes(event.target.value.toLowerCase()) || 
  action.price.includes(event.target.value) ||
 displayDate(action.date).toLowerCase().includes(event.target.value.toLowerCase())
  ) 

})

displaySales (searchedActions);

})


addBtn.addEventListener("click", (event) => {
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
})

const closeModal = () => {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
}

overlay.addEventListener("click", closeModal)

closeBtn.addEventListener("click", closeModal)

submitBtn.addEventListener("click", (e) => {

  const newAction = {
    name: modalNameInput.value,
    price: modalPriceInput.value,
    date: modalDateInput.value,
    type: modalTypeInput.value
  }
currentAccount.actions.push(newAction);
closeModal()
displaySales(currentAccount.actions);

modalNameInput.value = ""
modalPriceInput.value = ""
modalDateInput.value = ""
modalTypeInput.value = ""

})
