import '../styles/checkout.css';
import { Link, useParams } from 'react-router-dom';

const ThanksView = ()=>{
    
    const {transactionId} = useParams();

    return (
        <>
            <div id="checkout" className='d-flex flex-column border border-warning p-4 pb-5' style={{marginTop: '120px'}}>
                <div className='text-center w-100' style={{minHeight: '350px', alignContent: 'center'}}>
                    <i className='fat fa-check-circle my-4' style={{color: '#f8c947', fontSize: '5rem'}}></i>
                    <h1 className='fs-3 mx-auto'>Thank You - <i>Payment Complete</i></h1>
                    <span className='fs2'>Your transaction ID is <strong>{transactionId}</strong></span>
                    <span className='d-block mx-auto'>Your order has been passed to our agents for processing and will be with you shortly <b>:)</b></span>
                </div>
                <Link to='/' className='text-center mx-auto'><button className='btn border-warning'><i className='fa fa-home'></i> Back to Home</button></Link>
            </div>
        </>
    )
}

export default ThanksView;