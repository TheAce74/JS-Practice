const form = document.forms.add;

//fetch sites
window.addEventListener("DOMContentLoaded", fetchBookmarks);

//listen for form submit
form.addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.querySelector('#siteName').value;
    const siteUrl = document.querySelector('#siteUrl').value;

    if (!siteName || !siteUrl || /^\s+/.test(siteName) || /^\s+/.test(siteUrl)) {
        alert("Please fill in form properly");
        return false
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (!localStorage.getItem('bookmarks')) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    //clear form
    form.reset();

    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    const bookmarksDisplay = document.querySelector('.wrapper');

    bookmarksDisplay.innerHTML = "";
    for (let bookmark of bookmarks) {
        const name = bookmark.name;
        const url = bookmark.url;

        bookmarksDisplay.innerHTML += `<div class="item">
                                           <h3>${name}</h3>
                                           <a href="${url}" target="_blank"><button class="visit btn">Visit</button></a>
                                           <button class="delete btn" onclick= "deleteBookmark('${url}')">Delete</button>
                                       </div>`;
    }
}

//delete bookmark
function deleteBookmark(url) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (const bookmark of bookmarks) {
        if (bookmark.url == url) {
            bookmarks.splice(bookmarks.indexOf(bookmark), 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}