window.onload = function () {
    if (!(document.documentMode || /Edge/.test(navigator.userAgent))) {
        let pwdInput = document.querySelectorAll('.cnuShowPassword');
        [].forEach.call(pwdInput, (item) => {
            item.eye = document.createElement('i');
            item.eyeShown = false;
            item.loseFocus = true;
            item.isFirstTimeFocus = true;
            item.isFromBlur = false;
            item.eye.className = 'fa fa-eye';
            item.eye.setAttribute('aria-hidden', 'true');
            item.eye.style.opacity = .5; //For real browsers;
            item.eye.style.filter = "alpha(opacity=50)"; //For IE;
            item.eye.style.display = "none";
            item.appendChild(item.eye);
            item.querySelectorAll('input')[0].addEventListener('keydown', (e) => {
                item.eyeShown = true;
                item.loseFocus = false;
                if (!item.isFirstTimeFocus) {
                    item.loseFocus = true;
                }
                item.checkEyeValue();
            });
            item.querySelectorAll('input')[0].addEventListener('blur', (e) => {
                item.loseFocus = true;
                item.isFromBlur = true;
                item.checkEyeValue();
            });
            item.eye.addEventListener('mousedown', (e) => {
                if (item.eyeShown === true && item.loseFocus === false && item.isFirstTimeFocus === true) {
                    item.querySelectorAll('input')[0].setAttribute('type', 'text');
                }
            });
            item.eye.addEventListener('mouseup', (e) => {
                item.querySelectorAll('input')[0].setAttribute('type', 'password');
                item.querySelectorAll('input')[0].focus();
                item.loseFocus = false;
                item.checkEyeValue();
            });
            document.addEventListener('mouseup', (e) => {
                if (e.target !== item && !item.contains(e.target) && item.eyeShown === true) {
                    item.loseFocus = true;
                    item.isFirstTimeFocus = false;
                    item.checkEyeValue();
                }
            });
            item.checkEyeValue = function() {
                if (!item.isFromBlur) {
                    if (item.eyeShown === true && item.loseFocus === false) {
                        item.eye.style.display = "block";
                    } else {
                        item.eye.style.display = "none";
                    }
                }
                else {
                    item.isFromBlur = false;
                }
            }
        });
    }
};