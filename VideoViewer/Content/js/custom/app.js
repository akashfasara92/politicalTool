var app = angular.module("AngularApp", ['angular-select2', 'ui.bootstrap', 'angucomplete-alt', 'isteven-multi-select']).directive("angulardatepicker",
  function () {
    return {
      restrict: "A",
      link: function (scope, el, attr) {
        el.bootstrapMaterialDatePicker({
          time: false,
          dateFormat: 'DD-MMM-YYYY',
          clearButton: true
        });
      }
    };
  }).directive('angulartimepicker', function () {
    return {
      link: function (scope, el, attr) {
        el.bootstrapMaterialDatePicker({
          date: false,
          time: true,
          format: 'hh:mm A',
          clearButton: true
        });
      }
    };
  }).directive('onlydigits',
    function () {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
          function inputValue(val) {
            if (val) {
              var digits = val.replace(/[^0-9]/g, '');

              if (digits !== val) {
                ctrl.$setViewValue(digits);
                ctrl.$render();
              }
              return parseInt(digits, 10);
            }
            return undefined;
          }

          ctrl.$parsers.push(inputValue);
        }
      };
    }).directive('onlydecimals',
      function () {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
              if (val) {
                var digits = val.replace(/[^0-9.]/g, '');

                if (digits.split('.').length > 2) {
                  digits = digits.substring(0, digits.length - 1);
                }

                if (digits !== val) {
                  ctrl.$setViewValue(digits);
                  ctrl.$render();
                }
                return parseFloat(digits);
              }
              return undefined;
            }

            ctrl.$parsers.push(inputValue);
          }
        };
      });