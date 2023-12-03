/*****************************************************
Renders HTML content using a template function 
and inserts it into a specified parent element
*****************************************************/

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

/*****************************************************
Loads an HTML template from the specified path and returns 
a function that can be used to retrieve the template content
*****************************************************/

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

/*****************************************************
Loads and renders header and footer templates into 
their elements when DOMContentLoaded event is fired
*****************************************************/

export async function loadHeaderFooter() {
  document.addEventListener("DOMContentLoaded", async function () {
    const headerTemplateFn = loadTemplate("/views/partials/header.html");
    const footerTemplateFn = loadTemplate("/views/partials/footer.html");
    const headerEl = document.querySelector("#main-header");
    const footerEl = document.querySelector("#main-footer");
    renderWithTemplate(headerTemplateFn, headerEl);
    renderWithTemplate(footerTemplateFn, footerEl);
  });
}
