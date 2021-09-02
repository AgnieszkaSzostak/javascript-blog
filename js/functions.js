const titleClickHandler = function(event){
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
    const article = document.querySelector(hrefAttribute);
    article.classList.add('active');
}

const clearLinks = function(){
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
}

const generateTitleLinks = function(){
    const articles = document.querySelectorAll(optArticleSelector);
    const titleList = document.querySelector(optTitleListSelector);
    let html = '';
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
