import Checkout from '../components/checkout';

const CheckoutView = ()=>{

    return (
        <>
            <div className='d-block flex-column mx-auto mt-5' style={{
                width: "max-content"
            }}>
                <h1 className='fs-3 fw-bold'>Trades Team Checkout Development Challenge</h1>
                <span>Developed by Abel Akponine</span>
            </div>
            <Checkout />
        </>
    )
}

export default CheckoutView;