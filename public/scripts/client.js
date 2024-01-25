// limit character to 40?
const $inputBox = $('#input-box');
const $button = $('button');
const $listContainer = $('#list-container');
const $errorMessage = $('.error-message');
const $main = $('main');

////////////functions
const saveData = () => {
  localStorage.content = $listContainer.html();
};

const showTask = () => {
  $listContainer.html(localStorage.content);
};

// console.log('HTML of list container', $listContainer.html);

const erase = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const addTask = () => {
  const inputText = $inputBox.val();
  
  if (inputText.length === 0) {
    // eventuall change it to a better pop up message
    $errorMessage.show(200);
    return;
  }
  $errorMessage.hide()
  $($listContainer).append(`<div class="task-row">
  <li>${erase(inputText)} </li>
  <i id="cross" class="fa-regular fa-circle-xmark"></i>
  </div>`);
  saveData();
};

const checkAuthentication = () => {
  return new Promise((resolve, reject) => {
    $.get("/main-content", function(data, status) {
      if (status === 200) {
        resolve(data);
      } else {
        $main.append(data);
      }
    });
  })

};

// ////////////////functions

checkAuthentication()
  .then((data) => {
    $main.html(data);
    $errorMessage.hide();
  });

// once it's resolve
$errorMessage.hide();

$button.on('click', function() {
  addTask();
  // clears the input box after button event
  $(this).parents('.row').find('#input-box').val('');
});

$listContainer.on('click', function(event) {
  if (event.target.nodeName === "LI") {
    $(event.target).toggleClass('checked');
    saveData();
    return;
  }
  if (event.target.nodeName === "I") {
    $(event.target).parents('.task-row').remove();
    saveData();
  }
});

showTask();


// $errorMessage.hide();

// $button.on('click', function() {
//   addTask();
//   // clears the input box after button event
//   $(this).parents('.row').find('#input-box').val('');
// });

// $listContainer.on('click', function(event) {
//   if (event.target.nodeName === "LI") {
//     $(event.target).toggleClass('checked');
//     saveData();
//     return;
//   }
//   if (event.target.nodeName === "I") {
//     $(event.target).parents('.task-row').remove();
//     saveData();
//   }
// });

// showTask();