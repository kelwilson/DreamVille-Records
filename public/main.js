const btn = document.querySelector('button')
const artist_Modal_btn = document.querySelector('#add-artist')
const artist_form = document.querySelector('.artist-form')
const caret_up = document.querySelector('.fa-caret-up')

// event listener functions start
btn.addEventListener('click', dream)
artist_Modal_btn.addEventListener('click', inputOut)
caret_up.addEventListener('click', inputIn)
//event listener function ends

// open form modal function
function inputOut () {
    artist_form.classList.toggle('hidden')
}

//close form modal function
function inputIn() {
    artist_form.classList.add('hidden')
}


// an event listener for clicking anywhere on the page to close the form modal
document.body.addEventListener('click', (e) => {
    console.log(e, `yeah!!!`)
    // if (e.target.id !== 'add-artist' && artist_form.classList.contains('hidden')) {
        // console.log('We Outside 💪🏿‼️')}
        if(e.target.tagName === 'SECTION' || e.target.id === 'dream-container' || e.target.tagName === 'VIDEO') {

            artist_form.classList.add('hidden')
        }
    
})

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

