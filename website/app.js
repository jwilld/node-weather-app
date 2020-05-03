/* Global Variables */
const apiKey = '';




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



const toggleShow = () => {
    // hide journal entry input
    let closeButton = document.querySelector('.close-button');
    let journalInput = document.querySelector('.journal-input-container');
    closeButton.addEventListener('click', function (e) {
        e.preventDefault()
        journalInput.classList.add('hidden');
        addNewButton.classList.remove('hidden');
    });

    // show journal entry input
    let addNewButton = document.querySelector('.add-entry-button')
    addNewButton.addEventListener('click', function (e) {
        e.preventDefault();
        addNewButton.classList.add('hidden');
        journalInput.classList.remove('hidden');
    });

}
setTimeout(toggleShow, 0);

const getTemp = async (key, zip) => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`)
        .then(res => { return res.json() })
    return response.main.temp;
}
const postEntry = async (header, date, temp, zip, content) => {
    const addPost = await fetch('http://localhost:3000/entry', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "header": header,
            "date": date,
            "temp": temp,
            "zip": zip,
            "content": content
        })
    }).then(res => {return res.json()});
    console.log(addPost)
}
const renderPosts = (header,date,temp,zip,content) => {
    const fragment = document.createDocumentFragment();
    let journalEntries = document.querySelector('.journal-entries');

    const headerElement = document.createElement('h1');
    const paragraphElement = document.createElement('p');
    // const zipElement = document.createElement('span');
    const tempElement = document.createElement('span');
    const dateElement = document.createElement('span');
    const container = document.createElement('div');
    const subContainer = document.createElement('div');


    // add classes
    subContainer.classList.add('sub-container');
    // zipElement.classList.add('zip');
    tempElement.classList.add('temp');
    dateElement.classList.add('date');
    
    //set inner text for elements
    headerElement.innerText = header;
    container.appendChild(headerElement);

    // zipElement.innerText = zip;
    // subContainer.appendChild(zipElement)

    dateElement.innerText = date
    subContainer.appendChild(dateElement)

    tempElement.innerText = temp
    subContainer.appendChild(tempElement)

    container.appendChild(subContainer)

    paragraphElement.innerText = content;
    container.appendChild(paragraphElement);
    // add container to fragment
    fragment.appendChild(container)
    // add fragment to parent
    journalEntries.prepend(fragment);
}

const getPosts = async () => {
    const posts = await fetch('http://localhost:3000/posts').then(res => {return res.json()});
    console.log(posts)
    for(post of posts){
        renderPosts(post.header,
            post.date,
            post.temp,
            post.zip,
            post.content)
    }
}
setTimeout(getPosts,0);

addPost = () => {
    const submit = document.querySelector('.submit-button');
    submit.addEventListener('click', async function () {
        let title = document.querySelector('.journal-title-input').value;
        let zipCode = document.querySelector('.journal-zip-input').value;
        let content = document.querySelector('.journal-content-input').value;
        let temp = await getTemp(apiKey, zipCode);

        // adds post to backend
        postEntry(title, newDate, temp, zipCode, content);
        // adds post to UI
        renderPosts(title,newDate,temp,zipCode,content)
    })
}
setTimeout(addPost, 0);
