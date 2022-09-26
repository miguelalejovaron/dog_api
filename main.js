import API_KEY from './apikey.js';
let bringingMyPictureContainer = document.getElementById('myPictureContainer');
const API_URL_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=4`;
const API_URL_FAVOURITE = `https://api.thedogapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_UPLOAD = `https://api.thedogapi.com/v1/images/upload`;
const API_URL_DELETE_FROM_FAVOURITES = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=${API_KEY}`;



//fetch function for the callings
const fetchDataRandom = async (Apiurl) => {
	const response = await fetch(Apiurl);
	const data = await response.json();
	/* 	console.log(data); */
	return data;
};

//This function no needs to be called, because is already called due to the bracket.
(async () => {
	try {
		const dataPicture = await fetchDataRandom(API_URL_RANDOM);
		let view = `
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${dataPicture[0].url}" class=" w-100 data-picture" alt="Picture of a random dog">
                <button type="click" id="${dataPicture[0]
					.id}" onclick=" saveFavouriteDog(id)" class="btn btn-warning random-pictures__button--style-in-carrousel"> Click to save in favourites</button>
              </div>
              <div class="carousel-item">
                <img src="${dataPicture[1].url}" class=" w-100 data-picture"  alt="Picture of a random dog">
                <button type="click" id="${dataPicture[1]
					.id}" onclick="saveFavouriteDog(id)" class="btn btn-warning random-pictures__button--style-in-carrousel"> Click to save in favourites</button>
              </div>
              <div class="carousel-item">
                <img src="${dataPicture[2].url}" class=" w-100 data-picture" alt="Picture of a random dog">
                <button type="click" id="${dataPicture[2]
					.id}" onclick="saveFavouriteDog(id)" class="btn btn-warning random-pictures__button--style-in-carrousel"> Click to save in favourites</button>
              </div>
              <div class="carousel-item">
                <img src="${dataPicture[3].url}"  class=" w-100 data-picture" alt="Picture of a random dog">
                <button type="click" id="${dataPicture[3]
					.id}" onclick="saveFavouriteDog(id)" class="btn btn-warning random-pictures__button--style-in-carrousel"> Click to save in favourites </button>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
			  <i class="fa-solid fa-paw carousel__button-next-previous--color" aria-hidden="true"></i>
			  <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
				<i class="fa-solid fa-paw  carousel__button-next-previous--color" aria-hidden="true""></i>
                <span class="visually-hidden">Next</span> 
            </button>
          </div>
                <button type="click" id="moreDogs" class="btn btn-warning reload-button"> 
				Click to see more Dogs </button>
            `;
		bringingMyPictureContainer.innerHTML = view;
		let buttonMoreDogs = document.getElementById('moreDogs');

		//With this event the page will reload.
		buttonMoreDogs.addEventListener('click', () => {
			return location.reload();
		});
	} catch (error) {
		let callingCatchErrorRandomDogs = document.getElementById('catchError');
		let view = `
    <div class="card card__error-container--flex-box" style="width: 18rem;">
      <img src="https://cdn2.thedogapi.com/images/1lFmrzECl.jpg" class="card-img-top card__error-image--size" alt="Error">
      <div class="card-body card__card-body--size">
        <h2 class="card-text card__error-text--style">Something is wrong.Try to reload the page, the displayed error is: ${error}</h2>
      </div>
    </div>
    `;
		callingCatchErrorRandomDogs.innerHTML = view;
		console.error(error);
	}
})();

async function saveFavouriteDog(pictureId) {
	const response = await fetch(API_URL_FAVOURITE, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			image_id: `${pictureId}`
		})
	});
	const data = await response.json();
	try {
		/* console.log(response); */
		Toastify({
			text: 'Your dog has been saved on favourites',
			duration: 3000,
			gravity: 'bottom',
			position: 'right',
			className: 'notification-Toast',
			style: {
				background: 'linear-gradient(to right, #ffc000, #ffc107)'
			}
		}).showToast();
		loadFavouriteDogs();
	} catch (error) {
		spanError.innerHTML = `Hubo un error ${response.status} ${data.message} `;
		let callingCatchErrorRandomDogs = document.getElementById('catchError');
		let view = `
    <div class="card card__error-container--flex-box" style="width: 18rem;">
      <img src="https://cdn2.thedogapi.com/images/1lFmrzECl.jpg" class="card-img-top card__error-image--size" alt="Error">
      <div class="card-body card__card-body--size">
        <h2 class="card-text card__error-text--style">Something is wrong.Try to reload the page, the displayed error is: ${error}</h2>
      </div>
    </div>
    `;
		callingCatchErrorRandomDogs.innerHTML = view;
		console.error(error);
	}
}

async function loadFavouriteDogs() {
	const response = await fetch(API_URL_FAVOURITE);
	const data = await response.json();
	/* console.log(data); */
	try {
		const section = document.getElementById('favouritesDogsPictures');
		section.innerHTML = '';
		const h2 = document.createElement('h2');
		h2.className = 'text-center title-favourites-dogs__title--font-size-style';
		const textH2 = document.createTextNode('MY FAVOURITES DOGS PICTURES');
		h2.appendChild(textH2);
		data.forEach((dog) => {
			let view = `
      <div class="card card-section-favourites__container--flex-size">
        <img src="${dog.image.url}" class="card-img-top card-section-favourites__picture--size" alt="...">
        <a href="#" type="click" id="${dog.id}" onclick="deleteFromFavouriteDogs(id)" class="btn btn-warning card-section-favourites__button--style">Remove from favourites <br> <i class="fa-solid fa-dog favourite__icon-dog--size"></i></a>
      </div>
      `;
			section.innerHTML += view;
		});
	} catch (error) {
		spanError.innerHTML = `Hubo un error ${response.status} ${data.message} `;
		let callingCatchErrorRandomDogs = document.getElementById('catchError');
		let view = `
    <div class="card card__error-container--flex-box" style="width: 18rem;">
      <img src="https://cdn2.thedogapi.com/images/1lFmrzECl.jpg" class="card-img-top card__error-image--size" alt="Error">
      <div class="card-body card__card-body--size">
        <h2 class="card-text card__error-text--style">Something is wrong.Try to reload the page, the displayed error is: ${error}</h2>
      </div>
    </div>
    `;
		callingCatchErrorRandomDogs.innerHTML = view;
		console.error(error);
	}
}

async function deleteFromFavouriteDogs(id) {
	const response = await fetch(API_URL_DELETE_FROM_FAVOURITES(id), {
		method: 'DELETE'
	});
	const data = await response.json();
	try {
		Toastify({
			text: 'Your dog has been delited from favourites',
			duration: 3000,
			gravity: 'bottom',
			position: 'right',
			className: 'notification-Toast',
			style: {
				background: 'linear-gradient(to right, #ffc000, #ffc107)'
			}
		}).showToast();
		loadFavouriteDogs();
	} catch (error) {
		spanError.innerHTML = `Hubo un error ${response.status} ${data.message} `;
		let callingCatchErrorRandomDogs = document.getElementById('catchError');
		let view = `
			<div class="card card__error-container--flex-box" style="width: 18rem;">
			<img src="https://cdn2.thedogapi.com/images/1lFmrzECl.jpg" class="card-img-top card__error-image--size" alt="Error">
			<div class="card-body card__card-body--size">
				<h2 class="card-text card__error-text--style">Something is wrong.Try to reload the page, the displayed error is: ${error}</h2>
			</div>
			</div>
    `;
		callingCatchErrorRandomDogs.innerHTML = view;
		console.error(error);
	}
}

async function uploadDogPicture() {
	const form = document.getElementById('uploadingForm');
	const formData = new FormData(form);
	// console.log(formData.get('file'));

	const res = await fetch(API_URL_UPLOAD, {
		method: 'POST',
		headers: {
			'X-API-KEY': 'live_wOwVTGRc3cZgnMB7wO94pndTS7H4B714JYq3ccpbuKXJFWaItMgJ9P1Prnu2XBBX'
		},
		body: formData
	});
	const data = await res.json();
	try {
		Toastify({
			text: 'Your Image has been succesfully uploaded to the API',
			duration: 3000,
			gravity: 'bottom',
			position: 'right',
			className: 'notification-Toast',
			style: {
				background: 'linear-gradient(to right, #ffc000, #ffc107)'
			}
		}).showToast();
		// console.log('Your image was saved sucessfully');
		saveFavouriteDog(data.id);
	} catch (error) {
		spanError.innerHTML = `Hubo un error ${response.status} ${data.message} `;
		let callingCatchErrorRandomDogs = document.getElementById('catchError');
		let view = `
    <div class="card card__error-container--flex-box" style="width: 18rem;">
      <img src="https://cdn2.thedogapi.com/images/1lFmrzECl.jpg" class="card-img-top card__error-image--size" alt="Error">
      <div class="card-body card__card-body--size">
        <h2 class="card-text card__error-text--style">Something is wrong.Try to reload the page, the displayed error is: ${error}</h2>
      </div>
    </div>
    `;
		callingCatchErrorRandomDogs.innerHTML = view;
		console.error(error);
	}
}

// Button mail toggler
let buttonToggler = false;
const clickMailEvent = () => {
	const bringingTheContainerOfEmail = document.getElementById('iFClickInMail');
	if (!buttonToggler) {
		let view = `
		<p class="text-center" style="margin-bottom: 1em;">Press the button again, if you want to vanish the text below.</p>
		<h2 class="text-center mail__effect--style" REFL-TEXT>miguelalejovaron@hotmail.com</h2>

	`;
		bringingTheContainerOfEmail.innerHTML = view;
		buttonToggler = true;
	} else {
		let view = ``;
		bringingTheContainerOfEmail.innerHTML = view;
		buttonToggler = false;
	}
};

loadFavouriteDogs();
