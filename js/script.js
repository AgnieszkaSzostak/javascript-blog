'use strict';

/*Function Handler event click */

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
/* Function clearLinks */

function clearLinks(){
  let links2Clear = document.querySelectorAll('.titles li');
  console.log('links2Clear', links2Clear);
  for(let link of links2Clear){
      link.innerHTML = '';
  }
}

/* Function generate list of titles */

function generateTitleLinks(){
  console.log('funkcja generateTitleLinks została wywołana');


//   następnie dla każdego artykułu:
// odczytaj jego id i zapisz je do stałej,
// znajdź element z tytułem i zapisz jego zawartość do stałej,
  let listArticles = document.querySelectorAll('.post');
  console.log('listArticles:', listArticles);
  for(let article of listArticles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.firstElementChild.textContent;
    const articleLink = '<li><a href="#' + articleId + '><span>' + articleTitle + '</span></a></li>';
    console.log('articleLink =',  articleLink);
    console.log('articleId is:', articleId, 'articleTitle:', articleTitle);

  }

// na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,
// wstaw stworzony kod HTML do listy linków w lewej kolumnie.


}

clearLinks();
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
