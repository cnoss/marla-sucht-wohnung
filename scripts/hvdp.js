function initSlideshow(ele) {
  document.getElementById(ele.id).onclick = function (event) {
    event = event || window.event
    var target = event.target || event.srcElement
    var link = target.src ? target.parentNode : target
    var options = { index: link, event: event }
    var links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
  }
}

const slideshows = document.querySelectorAll(".gallery");
slideshows.forEach(slideshow => {
  initSlideshow(slideshow);
});

document.addEventListener("DOMContentLoaded", () => {
  const mailElement = document.querySelector("[data-info]");
  const adress = mailElement.dataset.info.replace(/<!--.*?-->/g, "");
  
  mailElement.innerHTML = adress;
  mailElement.addEventListener("click", () => {
    window.location.href = `mailto:${adress}?subject=Marla sucht eine Bleibe`;
  });
});
