const targets = document.querySelectorAll('img');

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const img = entry.target;
        const src = img.getAttribute('data-src');

        img.setAttribute('src', src);
        console.log("New image loaded! lazily.")
        observer.disconnect();
      }
    });
  });

  io.observe(target)
};

targets.forEach(lazyLoad);