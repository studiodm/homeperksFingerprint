/**
 * Created by reed.clarke on 4/13/2017.
 */

function sendData(face_book_id, adword_id, double_click_id, opt_one, opt_two, opt_three, opt_four, opt_five) {
    var customerid = getCookie("customerid");
    if(customerid === "undefined") {
        customerid = "";
    }
    var data = {
        customerid: customerid,
        face_book_id: face_book_id,
        adword_id: adword_id,
        double_click_id: double_click_id,
        opt_one: opt_one,
        opt_two: opt_two,
        opt_three: opt_three,
        opt_four: opt_four,
        opt_five: opt_five,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/BVBeaconAPI/v1/beacon', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            console.log("response:", this.responseText);
            if(this.responseText.length >= 7 && this.responseText.length <= 45) {
                setCookie('customerid', this.responseText, 365);
            }
        }
        else {
            console.log("error:",this.statusText)
        }
    };
    xhr.send(JSON.stringify(data));
}

function setCookie(cname, cvalue, exdays) {
    console.log("setCookie", cname, cvalue, exdays);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    console.log("getCookie", cname);
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
