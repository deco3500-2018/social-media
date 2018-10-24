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
    followingList.innerHTML = "";
    
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
                <i class="fas fa-times" username="${ user.username }" onclick="rejectClickHandler"></i>
            </div>
        `;
        followingList.appendChild(followingElem);
        followingElem.addEventListener('click', event => {
            let elem = event.target;
            console.log(elem.tagName);
            if (elem.tagName.toLowerCase() === 'i') {
                rejectClickHandler(elem);
                return;
            }

            let username = elem.getAttribute('username');
            while (!username && elem.parentNode) {
                elem = elem.parentNode;
                username = elem.getAttribute('username');
            }
            console.log(username);
            document.querySelector("#follow-detail").style.opacity = '0';
            setTimeout(() => {
                populateFollowDetail(username);
                document.querySelector("#follow-detail").style.opacity = '1';
            }, 250);
        }, false);
    }

    // select first in the list
    populateFollowDetail(data.users[0].username);
}

function rejectClickHandler(followingElem) {
    console.log("a");
    let overlay = document.querySelector('#overlay');
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        Would you like to unfollow ${followingElem.getAttribute('username')}?
        <div>
            <input type="button" id="closeButton" value="Cancel"></button>
            <input type="button" username=${followingElem.getAttribute('username')} id="deleteAccount" value="Confirm"></button>
        </div>

    `;

    document.querySelector('#closeButton').addEventListener('click', closeOverlay, false);
    document.querySelector('#deleteAccount').addEventListener('click', deleteAccount, false);
}

function closeOverlay(event) {
    console.log(close);
    document.querySelector('#overlay').style.display = 'none';
}

function deleteAccount(event) {
    let username = event.target.getAttribute('username');
    let data = getRecommendations();
    data = {
        users: data.users.filter(u => u.username != username)
    }
    localStorage.setItem('recommendations', JSON.stringify(data));
    updateFollowList(data);
    closeOverlay();
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
            <h1 class="large">${ Math.round(user.percentage) }%</h1>
            <h1>more likely to be sad.</h1>
        </div>

        <h1 class="post-count"><span class="dark">${ Math.round(user.postsPerWeek) }</span> posts per week</h1>

        <h1><span class="dark">${ Math.round(user.averageLikes) }</span> likes on average</h1>

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