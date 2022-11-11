async function main(){
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(displayBook)
}

function displayBook(book){
    let bookContainer = document.querySelector('#root')
    let bookObject = document.createElement('li')
    bookObject.textContent = book.title

    let bookQuantity = document.createElement('input')
    bookQuantity.value = book.quantity
    bookObject.append(bookQuantity)

    let saveButton = document.createElement('button')
    saveButton.textContent = "Save"
    saveButton.addEventListener('click', async () =>{
        console.log(bookQuantity.value)
        let response1 = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: bookQuantity.value
            })
            
        })
    })
    bookObject.append(saveButton)

    let removeButton = document.createElement('button')
    removeButton.textContent = "Delete"
    removeButton.addEventListener('click', async () => {
        bookContainer.removeChild(bookObject)
        let response2 = await fetch(`http://localhost:3001/removeBook/${book.id}`, {
            method: 'DELETE' 
        })
    })
    bookObject.append(removeButton)

    bookContainer.append(bookObject)

}

main()