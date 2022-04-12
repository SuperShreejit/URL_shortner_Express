const form = document.querySelector('.form')
const errorOutput = document.querySelector('.error')
const output = document.querySelector('.output')

form.addEventListener('submit', formHandler)

async function formHandler(e) {
  e.preventDefault()
  const inputElement = form.querySelector('#full-url')
  const fullUrl = inputElement.value
  try {
    const { shortUrl } = await axios.post('/', { fullUrl })
    showOutput(shortUrl)    
  } catch (error) {
    showError(error)
  }
}

function showOutput(url) {
  output.classList.add('success')
  output.innerText = 'Successfully added'
  setTimeout(() => {
    output.classList.remove('success')
    output.innerText = ''
  }, 5000)
}

function showError(error) {
  output.classList.add('error')
  
  if(error.message.endsWith('400'))
    output.innerText = `Error: Input cannot be empty`
  setTimeout(() => {
    output.classList.remove('error')
    output.innerText = ''
  }, 5000)
}