
const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const resultMsg = document.querySelector('#result')
const errorMsg = document.querySelector('#error')


    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        resultMsg.textContent = 'Loading'
        errorMsg.textContent = ''
        const location = search.value

        console.log(location);

        fetch('/weather?s=' + encodeURIComponent(location)).then((res) => {
            res.json().then((data) => {
                if(data.error){
                    resultMsg.textContent = ''
                    return errorMsg.textContent = data.error
                }
                resultMsg.textContent = data.forecast
            })
            
        })
        
    })