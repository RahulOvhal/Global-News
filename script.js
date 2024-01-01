// Accessing newsapi.org for api key 

const API_KEY = "c419b007e1444f669e2b05d5e9389289";

// URL for newsapi.org

const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

    const data = await res.json();

    console.log(data)
    // calling Binding data function

    bindData(data.articles);
    // console.log(bindData)

    console.log(`Current News is : ${query}`)

}  

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");

    // console.log(cardsContainer)

    const newsCardTemplate = document.getElementById("template-new-card");
    // console.log(newsCardTemplate)

    // we need to clear the card container for every new search 
    cardsContainer.innerHTML = "";


    articles.forEach(article => {
        // if card image is not exist than we skip that card 
        if(!article.urlToImage) return ;

        //  NOw we have to make Cards Clone for Every Article 
        const cardClone = newsCardTemplate.content.cloneNode(true);

        // Before appendChild we Need To Fill Data into Card
        fillData(cardClone, article);

        // Now we need to append cardClone to cardsContainer
        cardsContainer.appendChild(cardClone);
    });
}

    function fillData(cardClone, article) {
        const newsImg = cardClone.querySelector("#news-img");

        const newsTitle = cardClone.querySelector("#news-title")

        const newsSource = cardClone.querySelector("#news-source");

        const newsDescription = cardClone.querySelector("#news-desc");

        // getting date and converting into local string 

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });

        // Now Setting up the Data 

        newsImg.src= article.urlToImage;

        newsTitle.innerHTML = article.title;

        newsSource.innerHTML = `Source: ${article.source.name} | Date: ${date}`;
        // console.log(newsSource)


        newsDescription.innerHTML = article.description;
        // console.log(newsDescription)

        // to redirect to original article url 
        cardClone.firstElementChild.addEventListener("click", ()=> window.open(article.url, "_blank"));
    }


    //⭐ Now Handling Navbar Click 

    // to add active class 
    let currentElement = null;

    function onNavItemClick(id){
        fetchNews(id);

        const navItem = document.getElementById(id);
        currentElement?.classList.remove("active");
        currentElement = navItem;
        currentElement.classList.add("active");

        // when we click on Nav search input value must be empty
        searchInput.value = "";
    }

    // ⭐Now Handling Search Input Field.
    const searchButton = document.getElementById("search-button");

    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click",()=>{
        const searchText = searchInput.value;

        // CHanging search Button text while fetching news 
        // !fetchNews.data?searchButton.innerHTML = "Searching...":"search";


        // when fetchNews is loading searchButton text must be Searching if news filled search button text must be search.
        // if(!fetchNews.res){
        //     searchButton.innerHTML = "loading..";
        // }else{
        //     searchButton.innerHTML = "search";

        // }

        if(!searchText) return; // if searchInput is empty.

        fetchNews(searchText);

        
        // when we Search currentElements active class must be removed 
        currentElement?.classList.remove("active");
        currentElement = null;
    }) 
