let user_signed_in = false

chrome.browserAction.onClicked.addListener(function () {
    if (!user_signed_in) {
        chrome.windows.create({
            url: './popup-sign-in.html',
            width: 300,
            height: 600,
            focused: true
        })
    } else {
        chrome.windows.create({
            url: './popup-sign-out.html',
            width: 300,
            height: 600,
            focused: true
        })
    }
})

function flip_user_status(signIn, user_info) {
    if (signIn) {
        return fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_info)
        }).then(res => {
            return new Promise(resolve => {
                if (res.status !== 200) resolve('fail')
                chrome.storage.local.set({ userStatus: signIn, user_info }, function (response) {
                    if (chrome.runtime.lastError) resolve('fail')
                    user_signed_in = true
                    resolve('success')
                })
            })

        }).catch(err => console.log(err))
    } else if (!signIn) {
        return new Promise(resolve => {
            chrome.storage.local.get(['userStatus', 'user_info'], function (response) {
                if (chrome.runtime.lastError) resolve('fail');

                if (response.userStatus === undefined) resolve('fail');

                fetch('http://localhost:3000/api/users/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(response.user_info)
                })
                    .then(res => {
                        if (res.status !== 200) resolve('fail');

                        chrome.storage.local.set({ userStatus: signIn, user_info: {} }, function (response) {
                            if (chrome.runtime.lastError) resolve('fail');

                            user_signed_in = signIn;
                            resolve('success');
                        });
                    })
                    .catch(err => console.log(err));
            });
        });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        flip_user_status(true, request.payload)
            .then(res => sendResponse(res))
            .catch(err => console.log(err))
        return true
    } else if (request.message === 'logout') {
        flip_user_status(false, null)
            .then(res => sendResponse(res))
            .catch(err => console.log(err));
        return true;
    } else if (request.message === 'activate') {
        activate()
    } else if (request.message === 'deactivate') {
        deactivate()
    }
})

async function callCarbonAPI(details) {
    if (details.type === "main_frame") {
        const response = await fetch('http://localhost:3000/api/website', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: details.url
            })
        })

    }
    return {};
}

function activate() {
    chrome.webRequest.onBeforeRequest.addListener(
        callCarbonAPI,
        { urls: ["<all_urls>"] },
        ["blocking"]
    );
}


function deactivate() {
    chrome.webRequest.onBeforeRequest.removeListener(
        callCarbonAPI,
        { urls: ["<all_urls>"] },
        ["blocking"]
    );
}