const btn = document.querySelector('button')
const artist = document.querySelector('input').value

btn.addEventListener('click', dream)

async function dream() {
    console.log('why')
    try {
        const res = await fetch(`https://dreamville-records-kelwilson.onrender.com/api/${artist}`)

        if(!res.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await res.json()
        console.log(data)
    }
    catch(error) {
        console.error(`Error: ${error}`)
    }
}

console.log('yeah')