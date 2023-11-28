const urlPageTitle = "sf shrooms";

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches('nav a')) {
        return;
    }
    e.preventDefault();
    urlRoute();
})

const urlRoutes= {
    404:  {
        template: "/templates/404.html",
        title: "404 |" + urlPageTitle,
        description: "Page not found"
    },
    "/":  {
        template: "/templates/index.html",
        title: "Home |" + urlPageTitle,
        description: "The home page of the site"
    },
    "/about":  {
        template: "/templates/about.html",
        title: "About Us |" + urlPageTitle,
        description: "About us page",
    },
    "/shrooms":  {
        template: "/templates/shrooms.html",
        title: "Our Shrooms |" + urlPageTitle,
        description: "Shrooms available for purchase"
    },
    "/howitworks":  {
        template: "/templates/howitworks.html",
        title: "How It Works |" + urlPageTitle,
        description: "Details on how to order"
    },    
    "/contact":  {
        template: "/templates/contact.html",
        title: "Contact Us |" + urlPageTitle,
        description: "Contact us page"
    },
    "/resources":  {
        template: "/templates/resources.html",
        title: "Resources |" + urlPageTitle,
        description: "Resources page"
    }
}

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
 };
 
 const urlLocationHandler = async () => {
        const location = window.location.pathname;
        if(location.length == 0) {
            location = "/";
        }

        const route = urlRoutes[location] || urlRoutes["404"];
        const html = await fetch(route.template).then((response) => response.text());
        document.getElementById("content").innerHTML = html;
        document.title = route.title;
        document.querySelector('meta[name="description"]').setAttribute("content", route.description);
    };
    
    window.onpopstate = urlLocationHandler;
    window.route = urlRoute;
    urlLocationHandler();