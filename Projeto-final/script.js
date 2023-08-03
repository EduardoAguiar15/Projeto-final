const el = document.querySelector(".apresentacao2");
const apresentacao2 = "EDUARDO AGUIAR";
const interval = 300;

function showText(el,apresentacao2,interval) {
    const char = apresentacao2.split("").reverse();
    const typer = setInterval(() => {
        if(!char.length) {
            return clearInterval(typer);
        }
        const next = char.pop();
        el.innerHTML+= next;
    }, interval);
}
showText(el,apresentacao2,interval);