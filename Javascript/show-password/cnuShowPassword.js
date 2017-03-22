window.onload = function () {
    if (!(document.documentMode || /Edge/.test(navigator.userAgent))) {
        let pwdInput = document.querySelectorAll('.cnuShowPassword');
        [].forEach.call(pwdInput, (item) => {
            let eye = document.createElement('i');
            let eyeShown = false;
            let loseFocus = true;
            let isFirstTimeFocus = true;
            let isFromBlur = false;
            eye.className = 'fa fa-eye';
            eye.setAttribute('aria-hidden', 'true');
            eye.style.opacity = .5; //For real browsers;
            eye.style.filter = "alpha(opacity=50)"; //For IE;
            eye.style.display = "none";
            item.appendChild(eye);
            item.querySelectorAll('input')[0].addEventListener('keydown', (e) => {
                eyeShown = true;
                loseFocus = false;
                if (!isFirstTimeFocus) {
                    loseFocus = true;
                }
                checkEyeValue();
            });
            item.querySelectorAll('input')[0].addEventListener('blur', (e) => {
                loseFocus = true;
                isFromBlur = true;
                checkEyeValue();
            });
            eye.addEventListener('mousedown', (e) => {
                if (eyeShown === true && loseFocus === false && isFirstTimeFocus === true) {
                    item.querySelectorAll('input')[0].setAttribute('type', 'text');
                }
            });
            eye.addEventListener('mouseup', (e) => {
                item.querySelectorAll('input')[0].setAttribute('type', 'password');
                item.querySelectorAll('input')[0].focus();
                loseFocus = false;
                checkEyeValue();
            });
            document.addEventListener('mouseup', (e) => {
                if (e.target !== item && !item.contains(e.target)) {
                    loseFocus = true;
                    isFirstTimeFocus = false;
                    checkEyeValue();
                }

            });
            function checkEyeValue() {
                if (!isFromBlur) {
                    if (eyeShown === true && loseFocus === false) {
                        eye.style.display = "block";
                    } else {
                        eye.style.display = "none";
                    }
                }
                else {
                    isFromBlur = false;
                }
            }
        });
    }
};