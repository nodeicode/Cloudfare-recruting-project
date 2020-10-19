addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
class ElementHandler {
  constructor(links){
    this.links=links
  }
  element(element) {
    // An incoming element, such as `div`
    if(element.tagName=="div"){
      if(element.getAttribute("id")=="links")
      this.links.forEach(link=>element.append(`<a href = "${link.url}">${link.name}</a>`,{html:true}))
      if(element.getAttribute("id")=="profile")
      element.removeAttribute("style")
      if(element.getAttribute("id")=="social"){
        element.removeAttribute("style")
        element.append(`<a href="https://github.com/nodeicode">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg"></img><a>`,{html:true})
        element.append(`<a href="https://dev.to/nodeicode">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/dev-dot-to.svg"></img><a>`,{html:true})
        element.append(`<a href="https://www.linkedin.com/in/lohit-aryan/">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg"></img><a>`,{html:true})
      }
    }
    if(element.tagName=="img"&&element.getAttribute("id")=="avatar"){
      element.setAttribute("src","https://media-exp1.licdn.com/dms/image/C4D03AQGspnQrK5FXhQ/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=BwoIuOmldqSuKLTTjSVPvHTXP4nxmKQZOn2qEbAK_us")
    }
    if(element.tagName=="h1"&&element.getAttribute("id")=="name"){
      element.append("Lohit Aryan Gopikonda")
    }
    if(element.tagName=="title"){
      element.setInnerContent("Lohit Aryan Gopikonda")
    }
    if(element.tagName=="body"){
      element.removeAttribute("class")
      element.setAttribute("style","background-color:#A0AEC0")
      }
    }
} 
/**
 * @param {Request} request
 */
async function handleRequest(request) {
   const data = [
    { "name": "Portfolio Page", "url": "https://lohitaryan.now.sh" },
    { "name": "Bloomberg News", "url": "https://www.bloomberg.com/technology" },
    { "name": "Medium", "url": "https://medium.com/" },
  ]
  const rewriter = new HTMLRewriter()
  .on("*",new ElementHandler(data))
  const json = JSON.stringify(data,null,2)
  const url = new URL(request.url)
  if(url.pathname=="/links")
  return new Response(json,{headers: {
      "content-type": "application/json;charset=UTF-8",
    }})
  else{ 
    const html = await fetch("https://static-links-page.signalnerve.workers.dev");
    return rewriter.transform(html)
  }
}

