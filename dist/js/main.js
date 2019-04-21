const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.txt = "";
  this.wordIndex = 0;
  this.type();
  this.isDeleting = false;
};

/*Type method*/
TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span> `;
  /*Typwe speen*/
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed = typeSpeed / 2;
  }
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt == "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

/*init in Dom Load*/
document.addEventListener("DOMContentLoaded", init);

/*init  function*/
function init() {
  const txtElement = document.querySelector(".text-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  /*init type writter*/
  new TypeWriter(txtElement, words, wait);
}
