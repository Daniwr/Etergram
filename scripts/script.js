
const ppUser = document.querySelector(".popup-user");
const ppCard = document.querySelector(".popup-card");
const popupUser = document.querySelector("#popup-user");
const popupCard = document.querySelector("#popup-card");
const infoEdit = document.querySelector(".user-info-edit");
const addInfo = document.querySelector(".new-user-info");
const ppUserClose = ppUser.querySelector(".popup-close");
const ppCardClose = ppCard.querySelector(".popup-close");
const cardTemplate = document.querySelector("#card__template");
const container = document.querySelector(".card-container");

const userName = document.querySelector("#card__name");
const userDescription = document.querySelector("#card__description");
const formEdit = document.querySelector(".form-edit");
const formPlayer = document.querySelector(".form-player");
const formPlayerInputs = document.querySelectorAll(".form-player-input");

const initialData = [
    {
        title: "Gilberto Mora",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGhdM8gZ3ZgnHgCs6acRXb4fyAHb7ZfznIjmiP7OmiqQ&s=10",
        description: "Mediocampista"
    },
    {
        title: "Johan Vasquez",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-B84dV5rswGk6IyNCnV-8rVPYmj3_IG8knswjdBYKQ&s=10",
        description: "Defensa Central"
    },
    {
        title: "Tala Rangel",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNsHpJ0K2WZBUK06XsoAeVNLv-4uyf0yp7rmfCvpMvjA&s=10",
        description: "Portero"
    }
];

let data = JSON.parse(localStorage.getItem("players")) || initialData;

const createCard = (jugador) => {

    const card = cardTemplate.content.cloneNode(true);

    const cardTitle = card.querySelector(".card__name");
    const cardImage = card.querySelector(".card__image");
    const cardDescription = card.querySelector(".card__description");
    const likeButton = card.querySelector(".card__button__like");
    const dislikeButton = card.querySelector(".card__button__dislike");
    const likeCount = card.querySelector(".button__like__count");
    const dislikeCount = card.querySelector(".button__dislike__count");

    cardTitle.textContent = jugador.title;

    cardImage.src = jugador.img;
    cardImage.alt = jugador.title;

    cardDescription.textContent = jugador.description;


    likeButton.addEventListener("click", () => {
    const liked = likeButton.classList.contains("liked");

    if (liked) {
        likeButton.classList.remove("liked");
        likeCount.textContent = 0;
        
    } else {
        likeButton.classList.add("liked");
        dislikeButton.classList.remove("disliked");

        likeCount.textContent = 1;
        dislikeCount.textContent = 0;
    }
});

dislikeButton.addEventListener("click", () => {
    const disliked = dislikeButton.classList.contains("disliked");

    if (disliked) {
        dislikeButton.classList.remove("disliked");
        dislikeCount.textContent = 0;

    } else {
        dislikeButton.classList.add("disliked");
        likeButton.classList.remove("liked");

        dislikeCount.textContent = 1;
        likeCount.textContent = 0;
    }
});

    container.append(card);
};


data.forEach((jugador) => {
    createCard(jugador);
});


infoEdit.addEventListener("click", () => {
    popupUser.style.display = "block";
    document.body.classList.add("popup-active");
});


addInfo.addEventListener("click", () => {
    popupCard.style.display = "block";
    document.body.classList.add("popup-active");
});


ppUserClose.addEventListener("click", () => {
    popupUser.style.display = "none";
    document.body.classList.remove("popup-active");
});

ppCardClose.addEventListener("click", () => {
    popupCard.style.display = "none";
    document.body.classList.remove("popup-active");
});


formEdit.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.querySelector("#edit__name").value;
    const description = document.querySelector("#edit__description").value;

    const userData = {
        name: name,
        description: description
    };

    userName.textContent = userData.name;
    userDescription.textContent = userData.description;

    popupUser.style.display = "none";
    document.body.classList.remove("popup-active");

    formEdit.reset();

});


formPlayer.addEventListener("submit", (e) => {

    e.preventDefault();
    const name = document.getElementById("card__player__name").value;
    const description = document.getElementById("card__player__description").value;
    const img = document.getElementById("card__player__img").value;

    const jugador = {
        title: name,
        img: img,
        description: description
    };

    data.push(jugador);
    
    localStorage.setItem("players", JSON.stringify(data));
    createCard(jugador);
    popupCard.style.display = "none";
    document.body.classList.remove("popup-active");
    
    formPlayer.reset();
});

