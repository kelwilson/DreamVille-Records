const btn = document.querySelector('button')

btn.addEventListener('click', dream)

async function dream() {
    const artist = document.querySelector('input').value
    try {
        const res = await fetch(`https://dreamville-records-kelwilson.onrender.com/api/${artist}`)
        console.log(artist)
        // const res = await fetch(`http://localhost:8000/api/${artist}`)

        if(!res.ok) {
            throw new Error(`HTTP error: ${res.status}`)
        }

        const data = await res.json()
        // const artistArr = []
        // data.forEach(acts => artistArr.push(acts.birthName));
        console.log(data)
     
                    const details = document.createElement('article')
                    details.className = 'details';
                    details.innerHTML = `
                    <h1> Full Name: ${data.birthName}</h1>
                    <h2> Stage Name: ${data.stageName}</h2>
                    <h3> Other Names: ${data.otherNames || 'has no other name ‼️'}</h3>
                    <span>Age: ${2024 - parseInt(data.birthdate)}</span>
            
            `
            document.querySelector('#display-div').append(details)
 
    }
    catch(error) {
        console.error(`Error: ${error}`)
    }
}

console.log('yeah')

