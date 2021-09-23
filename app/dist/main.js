'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    // console.log(form)

    var formSend = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
            var errorF, requestURL, formData, values, sendRequest;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            e.preventDefault();

                            errorF = formValidate(form);
                            requestURL = 'https://jsonplaceholder.typicode.com/users';
                            formData = new FormData(form);
                            values = Object.fromEntries(formData.entries());

                            sendRequest = function sendRequest(method, url) {
                                var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                                return fetch(url, {
                                    method: method,
                                    body: JSON.stringify(body),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(function (response) {
                                    if (errorF === 0) {
                                        if (response.ok) {
                                            return response.json();
                                        } else {
                                            return response.json().then(function (error) {
                                                var e = new Error('Произошла ошибка');
                                                e.data = error;
                                                throw e;
                                            });
                                        }
                                    } else {
                                        alert('Заполните поле');
                                    }
                                });
                            };

                            sendRequest('POST', requestURL, values).then(function (data) {
                                // console.log(data)
                                form.reset();
                                alert('\u0417\u0430\u043A\u0430\u0437 \u043F\u0440\u0438\u043D\u044F\u0442 \u043D\u0430 \u043D\u043E\u043C\u0435\u0440 ' + data.phone);
                            }).catch(function (err) {
                                return console.log(err);
                            });

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function formSend(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    var formValidate = function formValidate(form) {
        var error = 0;
        var formReq = document.querySelectorAll('._req');

        for (var i = 0; i < formReq.length; i++) {
            var input = formReq[i];
            formRemoveError(input);

            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
        return error;
    };

    var formAddError = function formAddError(input) {
        // input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    var formRemoveError = function formRemoveError(input) {
        // input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    form.addEventListener('submit', formSend);
});