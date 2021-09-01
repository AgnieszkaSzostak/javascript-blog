'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }
  const hrefAttribute = clickedElement.getAttribute('href');
  let article = document.querySelector(hrefAttribute);
  article.classList.add('active');
}

const links = document.querySelectorAll('.titles li');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
