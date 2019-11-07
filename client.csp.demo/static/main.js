var unsafeDomBtn = document.getElementById('exploitUnsafeDom');
if(unsafeDomBtn) {
  var input = document.getElementsByName('unsafeDom')[0];
  unsafeDomBtn.onclick = ((textbox) => {
    let payload = document.getElementById('payload');
    return (event) => {
      alert('done');
      payload.innerHTML = textbox.value;
    }
  })(input)
}