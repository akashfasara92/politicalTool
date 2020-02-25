var utils = (function () {
    var alertTimeout = 5000;

    function getUrl(a) {
        var app = '';
        return app + a;
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function getDefaultSelect(x) {
        if (x === null || x === '')
            return '0';

        else
            return x;
    }

    function validateNumber(x) {
        if (x === null || x === '')
            return false;

        var k = x * 1;
        var v = parseInt(k);
        if (isNaN(v)) {
            return true;
        }

        return false;
    }

    function initToastr() {
        toastr.options = {
            closeButton: true,
            //positionClass: 'toast-top-full-width',
            timeout: alertTimeout
        };
    }

    function getQueryStringValue(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function showSuccessAlert(msg) {
        if (msg !== '' || msg !== null) {
            swal("", msg, "success");
        }
    }

    function showWarningAlert(msg) {
        if (msg !== '' || msg !== null) {
            swal("", msg, "warning");
        }
    }

    function showErrorAlert(msg) {
        if (msg !== '' || msg !== null) {
            swal("", msg, "error");
        }
    }

    function showSuccessToast(msg) {
        if (msg !== '' || msg !== null) {
            initToastr();
            toastr.success(msg);
        }
    }

    function showErrorToast(msg) {
        if (msg !== '' || msg !== null) {
            initToastr();
            toastr.error(msg);
        }
    }

    function formatDate(date) {
        if (date !== '' || date !== null) {
            var newdate;
            newdate = new Date(date);
            var monthNames = new Array("Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var currentDate = newdate.getDate();
            var currentMonth = newdate.getMonth();
            var currentYear = newdate.getFullYear();

            //newdate = currentDate + "-" + monthNames[currentMonth] + "-" + currentYear;
            newdate = currentYear + "-" + currentMonth + "-" + currentDate;

            return newdate;
        } else
            return newdate;
    }

    function formatDateTime(date) {
        if (date !== '' || date !== null) {
            var newdate = '';
            newdate = new Date(date);
            var monthNames = new Array("Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var currdate = newdate.getDate();
            var currmonth = newdate.getMonth();
            var curryear = newdate.getFullYear();
            var currhours = newdate.getHours();
            var currminutes = newdate.getMinutes();

            var ampmOpeningTime = currhours >= 12 ? 'PM' : 'AM';
            currhours = currhours % 12;
            currhours = currhours ? currhours : 12; // the hour '0' should be '12'
            currminutes = currminutes < 10 ? '0' + currminutes : currminutes;

            newdate = currdate + "-" + monthNames[currmonth] + "-" + curryear + " " + currhours + ':' + currminutes + ' ' + ampmOpeningTime;
            return newdate;
        } else
            return '';
    }

    function formatTime(date) {
        if (date !== '' || date !== null) {
            var newtime = '';

            var dateTime = new Date(date);
            var hoursTime = dateTime.getHours();
            var minutesTime = dateTime.getMinutes();
            var ampmTime = hoursTime >= 12 ? 'PM' : 'AM';
            hoursTime = hoursTime % 12;
            hoursTime = hoursTime ? hoursTime : 12; // the hour '0' should be '12'
            minutesTime = minutesTime < 10 ? '0' + minutesTime : minutesTime;
            newtime = hoursTime + ':' + minutesTime + ' ' + ampmTime;

            return newtime;
        } else
            return '';
    }

    function redirect(path) {
        window.location = path;
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function getCreationTime() {
        var dt = new Date();
        var creationtime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        return creationtime;
    }

    function isNullOrEmptyString(string) {
        var returnType = false;

        if (string === null)
            returnType = true;
        else if (string === undefined)
            returnType = true;
        else if (string.trim() === "")
            returnType = true;

        return returnType;
    }

    function isNullOrEmptyNumber(value) {
        debugger;
        var returnType = false;

        if (value === null)
            returnType = true;
        else if (value === undefined)
            returnType = true;
        else if (value === "")
            returnType = true;
        else if (value === 0)
            returnType = true;

        return returnType;
    }

    function isValidDropDownDigitValue(value) {
        var returnType = false;

        if (value === null)
            returnType = true;
        else if (value === undefined)
            returnType = true;
        else if (value === 0)
            returnType = true;

        return returnType;
    }

    function isValidDropDownStringValue(value) {
        var returnType = false;

        if (value === null)
            returnType = true;
        else if (value === undefined)
            returnType = true;
        else if (value.trim() === "")
            returnType = true;

        return returnType;
    }

    return {
        alertTimeout: alertTimeout,
        getUrl: getUrl,
        isNumeric: isNumeric,
        getDefaultSelect: getDefaultSelect,
        validateNumber: validateNumber,
        initToastr: initToastr,
        getQueryStringValue: getQueryStringValue,
        showSuccessAlert: showSuccessAlert,
        showWarningAlert: showWarningAlert,
        showErrorAlert: showErrorAlert,
        showSuccessToast: showSuccessToast,
        showErrorToast: showErrorToast,
        formatDate: formatDate,
        formatDateTime: formatDateTime,
        formatTime: formatTime,
        redirect: redirect,
        guid: guid,
        getCreationTime: getCreationTime,
        isNullOrEmptyString: isNullOrEmptyString,
        isValidDropDownDigitValue: isValidDropDownDigitValue,
        isNullOrEmptyNumber: isNullOrEmptyNumber,
        isValidDropDownStringValue: isValidDropDownStringValue
    };
}());