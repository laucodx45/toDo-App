// limit character to 40?
const $inputBox = $('#input-box');
const $button = $('button');
const $listContainer = $('#list-container');

const erase = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const addTask = () => {
  const inputText = $inputBox.val();
  
  if (inputText.length === 0) {
    // eventuall change it to a better pop up message
    alert('You must type something in Dawg!');
    return;
  }

  $($listContainer).append(`<div class="task-row">
  <li>${erase(inputText)} </li>
  <i id="cross" class="fa-regular fa-circle-xmark"></i>
</div>`);
};

$button.on('click', function() {
  addTask();
  // clears the input box after button event
  $(this).parents('.row').find('#input-box').val('');
})

$listContainer.on('click', function(event) {
  if (event.target.nodeName === "LI") {
    $(event.target).toggleClass('checked');
    return;
  }
  if (event.target.nodeName === "I") {
    $(event.target).parents('.task-row').remove();
  }
});