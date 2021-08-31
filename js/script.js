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
  console.log('funkcja clearLinks została wywołana');
  // let links2Clear = document.querySelector('.titles li');
  // console.log('links2Clear', links2Clear);
  document.querySelector('.titles').innerHTML = '';
  // for(let link of links2Clear){
  //     link.innerHTML = '';
  // }
}
/* ... */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';


/* Function generate list of titles */

function generateTitleLinks(){
  console.log('funkcja generateTitleLinks została wywołana');
  let listArticles = document.querySelectorAll('.post');
  console.log('listArticles:', listArticles);
  for(let article of listArticles) {
    const articleId = article.getAttribute('id');
    // const articleTitle = article.firstElementChild.textContent;
    console.log('articleId is:', articleId)
    const articleTitle = article.querySelector('.post-title');
    console.log('articleTitle:', articleTitle);
    console.log('articleTitle.textContent:', articleTitle.textContent)
    const articleLink = '<li><a href="#' + articleId + '><span>' + articleTitle.textContent + '</span></a></li>';
    console.log('articleLink =',  articleLink);
    let listOfTitles = document.querySelector('.titles');
    console.log('listOfTitles:', listOfTitles);
    // add articleLink to HTML

  }
}
//
clearLinks();
generateTitleLinks();
const links = document.querySelectorAll('.titles li');
console.log('links:', links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
