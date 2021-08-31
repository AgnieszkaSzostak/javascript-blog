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
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList.innerHTML:', titleList.innerHTML);
    titleList.innerHTML = '';
}

/* Function generate list of titles */

function generateTitleLinks(){
  console.log('funkcja generateTitleLinks została wywołana');
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList:', titleList);
  let html = '';
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    console.log('articleId is:', articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle:', articleTitle);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML =',  linkHTML);
    html = html + linkHTML;
    console.log('html:', html);
  }
  titleList.innerHTML = html;
}
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';
clearLinks();
generateTitleLinks();
const links = document.querySelectorAll('.titles li');
console.log('links:', links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
