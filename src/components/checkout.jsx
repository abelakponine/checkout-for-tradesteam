import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = ()=>{

    const navigate = useNavigate();

    let dummyCart = [{
        productId: 1,
        productName: 'Samsung S23 Ultra',
        price: 1200
    }];

    const formatCurrency = (amount, symbol)=>{
        let [integerPart, decimalPart] = amount.toFixed(2).split('.');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${symbol}${integerPart}.${decimalPart}`;
    }
    
    let totalPrice = dummyCart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    const validateEmail = (email)=>{
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    const handleSubmit = (event, url)=>{

        event.preventDefault();

        let form = document.getElementById('checkoutForm');
        let formData = new FormData(form);

        // Add items in cart
        formData.append('products', JSON.stringify(dummyCart));
        formData.append('total', totalPrice);

        // Form validation
        for (var x of form.elements){
            if (x.nodeName === 'INPUT' && x.value === ''){
                alert(x.name + ' is required');
                return false;
            }
            if ((x.name === 'expyear' && x.value.length < 4) || (x.name === 'expyear' && x.value < 2024)){
                alert(x.name.toUpperCase() + ': Minimum length of 4 and a value greater than 2023 is required');
                return false;
            }
            if (x.name === 'ccv' && x.value.length < 3){
                alert(x.name.toUpperCase() + ': Minimum length of 3 is required');
                return false;
            }
            if ((x.name === 'cardnumber' && x.value.length !== 16) || (x.name === 'cardnumber' && typeof(parseInt(x.value)) !== 'number')){
                alert(x.name.toUpperCase() + ': A length of 16 digit numbers is required');
                return false;
            }
            if (x.name === 'email' && !validateEmail(x.value)) {
                alert("Invalid email address.");
                return false;
            }
        }

        fetch('http://localhost:5000/' +url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.status === 'success') {
                navigate('/thank-you/'+data.transactionId);
            }
            else {
                console.log(data);
                alert(data.errorMessage);
            }
        });

    }

    return (
        <>
            <div id="checkout" className='border border-warning p-4'>
                <form id='checkoutForm' action="">
                    <div className="row">
                        <div className="d-flex col-sm-12">
                            <div id='leftcol'>
                                <label htmlFor="fullname">Full Name</label>
                                <input id="fullname" type="text" name='fullname' placeholder="Jone Doe" required/>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" name='email' placeholder="test@example.com" required/>
                                <label htmlFor="address">Address</label>
                                <input id="address" type="text" name='address' placeholder="51 TK. West Avenue" required/>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" name='city' placeholder="London" required/>
                                <label htmlFor="postcode">Postcode</label>
                                <input id="postcode" type="text" name='postcode' placeholder="LWX 124" required/>
                            </div>
                            <div id='rightcol'>
                                <label htmlFor="acceptedCards">Accepted Cards</label>

                                <div id='acceptedCards'>
                                    <i className='fab fa-cc-visa text-primary'></i>
                                    <i className='fab fa-cc-mastercard text-danger'></i>
                                    <i className='fab fa-cc-amex text-dark'></i>
                                    <i className='fab fa-cc-discover text-warning'></i>
                                </div>

                                <label htmlFor="nameOnCard">Name on Card</label>
                                <input id="nameOnCard" type="text" name='nameOnCard' placeholder="Abel O. A" required/>
                                <label htmlFor="ccnum">Card Number</label>
                                <input id="ccnum" type="number" name='cardnumber' minLength={16} maxLength={16} placeholder="1111-2222-3333-4444" required/>
                                <label htmlFor="expmonth">Exp Month</label>
                                <select id="expmonth" type="text" name='expmonth' placeholder="October" required>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>

                                <div className='d-flex flex w-100'>
                                    <div className='w-50 pe-2'>
                                        <label htmlFor="expyear">Exp Year</label>
                                        <input className='w-100' id="expyear" type="number" minLength={4} min={2024} name='expyear' placeholder="2027" required/>
                                    </div>
                                    <div className='w-50 pe-2'>
                                        <label htmlFor="ccv">CCV</label>
                                        <input className='w-100' id="ccv" type="number" minLength={3} max={999} name='ccv' placeholder="123" required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <input type="checkbox" name='sameAsShippingAddress' className='fs-1' style={{scale: 1.3, cursor: 'pointer'}} defaultChecked/> <span className='ms-2'>Shipping address is same as billing</span>
                        </div>

                        <div className='py-3'>
                            <strong>Total: {formatCurrency(totalPrice, '£')}</strong>
                        </div>
                        <button className='btn text-dark py-3 fw-bold' style={{
                            backgroundColor: '#f8c947',
                            borderRadius: '40px'
                        }} onClick={(event)=>handleSubmit(event, 'checkout')}>Continue to Checkout</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Checkout;