setTimeout(function() { document.getElementById('msg').innerHTML = ''}, 2500);

function createTexboxBlurHandler(checkbox) {
  return function (event) {
    console.log('event fired')
    console.log(event.target)
    console.log(event.target.value)
    if(event.target.value.trim().length === 0) {
      checkbox.checked = ''
    } else {
      checkbox.checked = 'checked'
    }
  }
}

[].forEach.call(document.getElementById('directiveList').getElementsByTagName('li'), (listItem)=>{
  listItem.lastChild.addEventListener('blur', createTexboxBlurHandler(listItem.firstChild))
})