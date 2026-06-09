document.getElementById('closeBtn').addEventListener('click', function () {
  window.close();
  this.closest('.card').style.display = 'none';
});
