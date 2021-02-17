import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    //ajax call
    axios.post('/update-cart',pizza).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar: false,
            text: 'Item added to cart :)'
        }).show();
    }).catch( err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar: false,
            text: 'Something went wrong'
        }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        //console.log(pizza)
        updateCart(pizza)
    })
})

//remove alert message after a few seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

initAdmin()

//render updated status
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null

order = JSON.parse(order)
//console.log(order)

let allstatus = document.querySelectorAll('.status_line')
//console.log(allstatus)

let time = document.createElement('small')


function updateStatus(order){
    let stepCompleted = true;
    allstatus.forEach((status)=>{
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}

updateStatus(order)