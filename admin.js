async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const storedHash = "fdc4dddb01a836f6e221d3718235ac8281d1f38e31d7d93cf5ba7f6934c165ca";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const pass = document.getElementById("password").value;
    const hash = await hashString(pass);

if (hash === storedHash) {

    const wrapper = document.querySelector(".lore-wrapper");
    const clone = wrapper.cloneNode(true);

    const output = clone.querySelector("#lore-output");
    const fullHTML = output.innerHTML.trim();

    output.innerHTML = "";

    const snow = document.getElementById("snow");
    document.body.innerHTML = "";
    document.body.appendChild(snow);
    document.body.appendChild(clone);

    let i = 0;
    function type() {
        output.innerHTML = fullHTML.slice(0, i);
        if (i < fullHTML.length) {
            i++;
            setTimeout(type, 28);
        }
    }
    type();

} else {
    document.getElementById("message").innerText = "Incorrect password!";
}

});