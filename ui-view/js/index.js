const myForm = document.querySelector('form');
const dogNameInput = myForm.querySelector('.input_dog-name');
const dogRaceInput = myForm.querySelector('.input_dog-race');
const dogAgeInput = myForm.querySelector('.input_dog-age');
const dogDescInput = myForm.querySelector('.input_dog-desc');
const formSubmit = myForm.querySelector('.input_form-submit');
const linkToQueryString = myForm.querySelector('.linkToQueryString');

formSubmit.addEventListener('click', (e)=> {
    linkToQueryString.href = '?name=' + dogNameInput.value + '?race=' + dogRaceInput.value + '?age=' + dogAgeInput.value + '?desc=' + dogDescInput.value;;
    console.log('?name=' + dogNameInput.value + '?race=' + dogRaceInput.value + '?age=' + dogAgeInput.value + '?desc=' + dogDescInput.value);
} );
