'use strict';


// po kliknięciu linka:

//    ustaw klasy linków:
//      usuń klasę active ze wszystkich linków na liście tytułów,
//      dodaj klasę active do klikniętego linka,

//  ukryj wszystkie artykuły:
//      usuń klasę active ze wszystkich artykułów,

//  znajdź artykuł do wyświetlenia:
//      z klikniętego linka weź zawartość atrybutu href, np. #article-2,
//      znajdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli   szukamy elementu o id="article-2",

//  wyświetl znaleziony artykuł:
//      dodaj klasę active do znalezionego artykułu.

// function titleClickHandler(){
//   const links = document.querySelectorAll('.titles a');
//   console.log(links);
// }
//
// const buttonTest = document.getElementById('button-test');
//
// buttonTest.addEventListener('click', titleClickHandler);
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
  console.log('clickedElement:', clickedElement)
  clickedElement.classList.add('active');
      /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  console.log('aktywne linki to: ');
  console.log(activeArticles);
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
