const colorInput = document.getElementById("input-color")
const colorModeInput = document.getElementById("color-mode")
const form = document.getElementById("color-form")
const colorPalContainer = document.getElementById("col-container")
const colorHexContainer = document.getElementById("hex-footer")

renderColors()

form.addEventListener("submit", function() {
    event.preventDefault()
    renderColors()
})


function renderColors() {
    let url = `https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${colorModeInput.value}&count=5`
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        let colorsArray = data.colors.map(color => color.hex.value)
        
        let colorHtml = colorsArray.map(color => {
            return `<div class="color" style="background: ${color}">
            <input type="text" class="color-hex" onclick="copyHex(this)" value=${color}>
            </div>`
        }).join('')
        
        let colorHexHtml = colorsArray.map(color => {
            return `<p class="color-hex">${color}</p>`
        }).join('')
        
        colorPalContainer.innerHTML = colorHtml
        // colorHexContainer.innerHTML = colorHexHtml
        
    })
}


function copyHex(e) {
    e.select()
    document.execCommand('copy');
    alert(`copied ${e.value}`);
}
