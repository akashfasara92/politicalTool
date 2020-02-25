// Dispaly Alert message box for Kendo frid error
function display_kendoui_grid_error(e) {
    if (e.errors) {
        if ((typeof e.errors) === 'string') {
            //single error
            //display the message
            //alert(e.errors);
            if (e.errors !== "No data found.")
                swal('', e.errors, "error");
        } else {
            //array of errors
            //source: http://docs.kendoui.com/getting-started/using-kendo-with/aspnet-mvc/helpers/grid/faq#how-do-i-display-model-state-errors?
            var message = "The following errors have occurred:";
            //create a message containing all errors.
            $.each(e.errors, function (key, value) {
                if (value.errors) {
                    message += "\n";
                    message += value.errors.join("\n");
                }
            });
            //display the message
            if (message !== "No data found.")
                swal('', message, 'warning');
        }
        //ignore empty error
    } else if (e.errorThrown) {
        swal("", e.errorThrown, "error");
        //alert('Error happened');
    }
}

// Ajax activity indicator bound to ajax start/stop document events
$(document).ajaxStart(function () {
    $('#ajaxBusy').show();
}).ajaxStop(function () {
    $('#ajaxBusy').hide();
});

// CSRF (XSRF) security
function addAntiForgeryToken(data) {
    //if the object is undefined, create a new one.
    if (!data) {
        data = {};
    }
    //add token
    var tokenInput = $('input[name=__RequestVerificationToken]');
    if (tokenInput.length) {
        data.__RequestVerificationToken = tokenInput.val();
    }
    return data;
};

// Popup form URL
function displayPopupContentFromUrl(url, title, modal, width) {
    debugger;
    var isModal = (modal ? true : false);
    var targetWidth = (width ? width : 550);
    var maxHeight = $(window).height() - 20;

    $('<div></div>').load(url)
        .dialog({
            modal: isModal,
            position: ['center', 20],
            width: targetWidth,
            maxHeight: maxHeight,
            title: title,
            close: function (event, ui) {
                $(this).dialog('destroy').remove();
            }
        });
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

//Allow only Numeric
function ValidateNumber(e) {
    if (e.keyCode === 9 || e.which === 9) {
        return true;
    }
    else if (e.key >= 0 && e.key <= 9) {
        return true;
    }
    else
        return false;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode !== 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

//Allow only Tyniint
function ValidateTyniIntRange(txtControl, lblError) {
    var ReturnType = false;
    var txtValue = $("#" + txtControl).val();

    if ((parseInt(txtValue) >= 0 && parseInt(txtValue) <= 255) || txtValue == '') {
        $("#" + lblError).css('display', 'none');
        ReturnType = true;
    }
    else {
        $("#" + lblError).css('display', 'block');
        ReturnType = false;
    }
    return ReturnType;
}

// Phone number Format (000-000-0000) call on keypress
function FormatPhoneNo(obj) {
    var e = this.event;
    // regular Expiration for Check Number 0 to 9
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    // Check Input number is Number or character
    if (regex.test(str) || e.charCode === "9" || e.charCode === "0") {
        var numbers = obj.value.replace(/\D/g, ''),
            //return Number in 000-000-0000 (max length = 12 and 3, 6, 10 is index when you need to set any Character)
            char = { 3: '-', 6: '-', 10: '-' };
        obj.value = '';
        for (var i = 0; i < numbers.length; i++) {
            obj.value += (char[i] || '') + numbers[i];
        }
    } else {
        //if character is not number then retune
        e.preventDefault();
        return false;
    }
}

//Allow only Decimal
function CheckNumeric(el) {
    var ex = /^[0-9]+\.?[0-9]*$/;
    if (ex.test(el.value) === false) {
        el.value = el.value.substring(0, el.value.length - 1);
    }
}

function CheckNumericMinus(el) {
    var ex = /^[0-9]+\.?[0-9]*$/;
    if (ex.test(el.value) === false) {
        el.value = el.value.substring(0, el.value.length - 1);
    }
}

function isNumericWithMinus(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode !== 45 || $(element).val().indexOf('-') !== -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode !== 46 || $(element).val().indexOf('.') !== -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isInteger(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode !== 45 || $(element).val().indexOf('-') !== 0) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode !== 46 || $(element).val().indexOf('.') !== 0) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isNumericPositive(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode !== 45 || $(element).val().indexOf('-') !== 0) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode !== 46 || $(element).val().indexOf('.') !== -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isNumeric(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode !== 45 || $(element).val().indexOf('-') !== -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode !== 46 || $(element).val().indexOf('.') !== -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isLowerLetterAndNumber(evt) {
    var charCode = (evt.which) ? evt.which : window.event.keyCode;
    if (charCode <= 13) {
        return true;
    } else {
        var keyChar = String.fromCharCode(charCode);
        var re = /^[a-z0-9]+$/;
        return re.test(keyChar);
    }
}

//EX : ExportGridData
function ExportGridData(gridName, fileName) {
    debugger;
    var excludeColumnArray = ["Edit", "Delete", "Active", "Registration", "Add Store Credit", "Store Credit", "Report Mapping", "Receipt Configuration"];
    var includeColumnArray = [];
    debugger;
    var items = [];
    var itemCells = [];
    var dynamicArrayHeader = [];
    var dynamicArrayHeaderTitle = [];
    var dynamicArrayData = [];
    var finalArray = [];

    var grid = $("#" + gridName).data("kendoGrid");
    for (var k = 0; k < grid.columns.length; k++) {
        var hiddenValue = grid.columns[k].hidden;
        if (hiddenValue === undefined || hiddenValue === false) {
            if (jQuery.inArray(grid.columns[k].title, excludeColumnArray) === '-1' || jQuery.inArray(grid.columns[k].title, excludeColumnArray) === -1) {
                dynamicArrayHeader.push({ value: grid.columns[k].field, Key: k });
                dynamicArrayHeaderTitle.push({ value: grid.columns[k].title, Key: k });
            }
        }
    }
    //finalArray.push({ cells: dynamicArrayHeaderTitle });
    finalArray.push({ cells: dynamicArrayHeader });

    $.each(grid.tbody.get(0).rows, function (idx, row) {
        itemCells.push(row.cells);
        //var item = grid.dataItem(row);
        items.push(row);
    });

    //Set data for excel CSV
    for (var i = 0; i < itemCells.length; i++) {
        var colValues = itemCells[i];
        for (var j = 0; j < dynamicArrayHeader.length; j++) {
            var colIndex = dynamicArrayHeader[j].Key;
            var chkBoxControl = colValues[colIndex].innerHTML;

            if (chkBoxControl.includes('type="checkbox"') || chkBoxControl.includes("type='checkbox'") || chkBoxControl.includes('class="fa fa-check"')) {
                if (chkBoxControl.includes('checked="checked"') || chkBoxControl.includes("checked='checked'") || chkBoxControl.includes('class="fa fa-check"'))
                    colValues[colIndex].innerHTML = "true";
                else
                    colValues[colIndex].innerHTML = "false";
            }

            dynamicArrayData.push({ value: colValues[colIndex].innerHTML });
        }
        finalArray.push({ cells: dynamicArrayData });
        dynamicArrayData = [];
    }

    //Export grid to CSV
    var workbook = new kendo.ooxml.Workbook({
        sheets: [
            {
                columns: [
                    { autoWidth: false },
                    { width: 200 }
                ],
                title: fileName,
                rows: finalArray
            }
        ]
    });
    debugger;
    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: fileName + ".csv" });
    showSuccessMessage(fileName + "Export Successfully");

    dynamicArrayHeader = [];
    dynamicArrayHeaderTitle = [];
    dynamicArrayData = [];
    finalArray = [];
    return false;
}

// Check Image Exist Or Not
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
};