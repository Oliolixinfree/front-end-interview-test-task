document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    // console.log(form)

    const formSend = async (e) => {
        e.preventDefault()

        let errorF = formValidate(form)

        const requestURL = 'https://jsonplaceholder.typicode.com/users'

        const formData = new FormData(form)
        const values = Object.fromEntries(formData.entries())

        const sendRequest = (method, url, body = 0) => {
            return fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (errorF === 0) {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return response.json().then(error => {
                            const e = new Error('Произошла ошибка')
                            e.data = error
                            throw e
                        })
                    }
                } else {
                    alert('Заполните поле')
                }
            })
        };

        sendRequest('POST', requestURL, values)
            .then(data => {
                // console.log(data)
                form.reset()
                alert(`Заказ принят на номер ${data.phone}`)
            })
            .catch(err => console.log(err))
    };

    const formValidate = (form) => {
        let error = 0
        const formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input)

            if (input.value === '') {
                formAddError(input)
                error++
            }
        }
        return error
    };

    const formAddError = (input) => {
        // input.parentElement.classList.add('_error');
        input.classList.add('_error')
    };

    const formRemoveError = (input) => {
        // input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    };


    form.addEventListener('submit', formSend)
});