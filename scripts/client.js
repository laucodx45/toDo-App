// limit character to 40?
const $inputBox = $('#input-box');
const $button = $('button');
const $listContainer = $('#list-container');

const addTask = () => {
  const inputText = $inputBox.val();
  
  if (inputText.length === 0) {
    // eventuall change it to a better pop up message
    alert('You must type something in Dawg!');
    return;
  }

  $($listContainer).append(`<li>${inputText}</li>`);
};

$('button').on('click', function() {
  addTask();

})

$inputBox.on('click', () => {
  console.log('clicked input box')
})