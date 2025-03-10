// const btn = document.querySelector('button')
// const artist_Modal_btn = document.querySelector('#add-artist')
// const artist_form = document.querySelector('.artist-form')
// const caret_up = document.querySelector('.fa-caret-up')
// const favorite = document.querySelectorAll('.fa-heart')
// const trash = document.querySelectorAll('.fa-trash-can')

// event listener functions start

// btn.addEventListener('click', dream)
// artist_Modal_btn?.addEventListener('click', inputOut)
// caret_up?.addEventListener('click', inputIn) //used '?' optional chaining method to prevent errors while accessing properties or methods on null or undefined
// Array.from(favorite).forEach(btn => btn.addEventListener('click', addLove))
// Array.from(trash).forEach(can => can.addEventListener('click', deleteArtist))

//event listener functions ends

// open form modal function
// function inputOut () {
//     artist_form?.classList.toggle('hidden')
// }

// //close form modal function
// function inputIn() {
//     artist_form.classList.add('hidden')
// }


// an event listener for clicking anywhere on the page to close the form modal
// document.body.addEventListener('click', (e) => {
//     console.log(e.target, `yeah!!!`)
//     // if (e.target.id !== 'add-artist' && artist_form.classList.contains('hidden')) {
//         // console.log('We Outside 💪🏿‼️')
// // writing the value of tagName in CAPS because tag only accepts CAPS value
//         if(e.target.tagName === 'SECTION' || e.target.id === 'dream-container' || e.target.tagName === 'VIDEO' || e.target.id === 'search-artist' || e.target.tagName === 'IMG' || e.target.tagName === 'DIV') {

//             artist_form?.classList.add('hidden')
//         }
    
// })

// function dream () {
//     console.log('We Outside 💪🏿‼️')
// }

// function why () {
//     console.log('wethin dey happen')
// }

// adding a favorite artist
// async function addLove(event) {
//     const artistId = event.currentTarget.closest('.artist')?.dataset.id;

//     console.log(artistId)

//     try{
//         const response = await fetch('/favoriteArtist', {
//             method: 'PUT',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'artistIdFromJSFile': artistId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// deleting an artist 
// async function deleteArtist(event) {
//     const artistId = event.currentTarget.closest('.artist')?.dataset.id;

//     console.log(artistId)
//     console.log('wow')

//     try{
//         const response = await fetch('/deleteArtist', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'artistIdFromJSFile': artistId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// console.log('yeah')
