window.onload = init;

function init() {
    getData().then(updateFollowList);
}

function getData() {
    return new Promise((resolve, err) => {
        fetch(`/recommendations-data?username=${ getUsername() }`)
        .then( response => response.json())
        .then( data => {
            localStorage.setItem('recommendations', JSON.stringify(data));
            resolve(data);
        });
    });
}

function updateFollowList(data) {
    let followingList = document.querySelector('#following-list');
    
    for (user of data.users) {
        let followingElem = document.createElement('div');
        followingElem.setAttribute('class', 'follow');
        followingElem.setAttribute('username', user.username);
        followingElem.innerHTML = `
            <img src="${ user.profilePic }">
            <div class="names">
                <h4>${ user.name }</h4>
                <h4>${ user.username }</h4>
            </div>
            <div class="decision">
                <i class="fas fa-check" onclick="tickClickHandler"></i>
                <i class="fas fa-times" onclick="rejectClickHandler"></i>
            </div>
        `;
        followingList.appendChild(followingElem);
        followingElem.addEventListener('click', event => {
            document.querySelector("#follow-detail").style.opacity = '0';
            setTimeout(() => {
                populateFollowDetail(event.target.getAttribute('username'));
                document.querySelector("#follow-detail").style.opacity = '1';
            }, 250);
        }, false);
    }

    // select first in the list
    populateFollowDetail(data.users[0].username);
}

function tickClickHandler(followingElm) {
    alert('Add');
}

function rejectClickHanlder(followingElm) {
    alert('Remove');
    // remove from dom

    // remove from data
}

function populateFollowDetail(username) {
    let user = getRecommendations().users.find(user => user.username === username);

    if (!user) {
        return;
    }

    let followDetail = document.querySelector('#follow-detail');
    followDetail.innerHTML = `
        <div class="heading">
            <h1>${ user.name.split(" ")[0] }'s followers are</h1>
            <h1 class="large">${ user.percentage }%</h1>
            <h1>more likely to be sadder.</h1>
        </div>

        <h1 class="post-count"><span class="dark">${ user.postsPerWeek }</span> posts per week</h1>

        <h1><span class="dark">${ user.averageLikes }</span> likes on average</h1>

        <div class="gallery">
            ${
                user.photos.map( photo => `<img src=${photo}>`).join('')
            }
        </div>
    `;
}

function getRecommendations() {
    return JSON.parse(localStorage.getItem('recommendations'));
}

function getUsername() {
    return localStorage.getItem('username');
}