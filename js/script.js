'use strict';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }
      /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
      /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  console.log('aktywny artykuł to: ', activeArticles);
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }
    /* get 'href' attribute from the clicked link */

  const hrefAttribute = clickedElement.getAttribute('href');
  // hrefAttribute = hrefAttribute.substr(1);
  console.log('hrefAttribute:', hrefAttribute);
    /* find the correct article using the selector (value of 'href' attribute) */

  let article = document.querySelector(hrefAttribute);
  console.log('article:', article);
    // let article = document.getElementById(hrefAttribute);
    // console.log(article);
  // /* add class 'active' to the correct article */
  article.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
