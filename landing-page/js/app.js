/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
//

const navList = document.querySelector('#navbar__list');
const headingsArr = Array.from(document.querySelectorAll('section'));

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function scrollIntoView(target){
  const scrollTarget = document.getElementById(target).offsetTop;
  window.scrollTo({ top: scrollTarget, behavior: 'smooth'});
}

// Next we want to create a function that will be called when that element is intersected
function handleIntersection(entries) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-section')
    } else {
      entry.target.classList.remove('active-section')
    }
  });
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(elements){
    elements.forEach(h => {
      const newElement = document.createElement('li');
      const id = h.getAttribute('id');
      const link = document.createElement('a');
      link.setAttribute('href', '#' + id);
      link.classList.add('menu__link')
      link.textContent = h.getAttribute('data-nav');
      newElement.innerHTML = link.outerHTML;
      navList.appendChild(newElement);
    });
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu on page load
buildNav(headingsArr);

// add listeners to nav menu links
document.querySelectorAll('.menu__link').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    // remove hashtag before passing to scrollIntoView function
    const target = event.target.getAttribute('href').split('#')[1];
    scrollIntoView(target);
  })
})

// Set sections as active
document.querySelectorAll('section').forEach(item => {
  console.log(item)
  const target = item;
  // Next we instantiate the observer with the function we created above. This takes an optional configuration
  // object that we will use in the other examples.
  const observer = new IntersectionObserver(handleIntersection);

  // Finally start observing the target element
  observer.observe(target);

})
