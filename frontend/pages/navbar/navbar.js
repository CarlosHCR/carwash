async function getNavBar() {
  const htmlResponse = await fetch("../navbar/navbar.html");
  const htmlData = await htmlResponse.text();
  document.getElementById("navbar").innerHTML = htmlData;

  const cssResponse = await fetch("../navbar/style.css");
  const cssData = await cssResponse.text();
  const styleElement = document.createElement("style");
  styleElement.innerHTML = cssData;
  document.head.appendChild(styleElement);
}
