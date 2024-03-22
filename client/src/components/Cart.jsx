import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePayment } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import UserProfile from './UserProfile';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [quantityMap, setQuantityMap] = useState({});
    const [total, setTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [doorNo, setDoorNo] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [holdername, setHolderName] = useState('');
    const [cod, setCod] = useState(false);
    const [ordered, setOrdered] = useState(false);
    const [orderedItems, setOrderedItems] = useState([]);
    const [showProfile, setShowProfile] = useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (!auth) {
          window.location.href = '/home';
        } else {
          fetchProducts();
        }
      }, [localStorage.getItem('user')]);

    const handleCheckboxChange = (value) => {
        setSelectedOption(value);
    };

    const handleQuantityIncrement = (product) => {
        const updatedMap = { ...quantityMap };
        updatedMap[product._id] = (updatedMap[product._id] || 0) + 1;
        setQuantityMap(updatedMap);

        // Recalculate total price and total discount
        let newTotal = total + parseFloat(product.price);
        let newTotalDiscount = totalDiscount + (parseFloat(product.price) * parseFloat(product.discount) / 100);
        setTotal(newTotal);
        setTotalDiscount(newTotalDiscount);
    };
    const handleQuantityDecrement = (product) => {
        if (quantityMap[product._id] > 0) {
            const updatedMap = { ...quantityMap };
            updatedMap[product._id] = updatedMap[product._id] - 1;
            setQuantityMap(updatedMap);

            // Recalculate total price and total discount
            let newTotal = total - parseFloat(product.price);
            let newTotalDiscount = totalDiscount - (parseFloat(product.price) * parseFloat(product.discount) / 100);
            setTotal(newTotal);
            setTotalDiscount(newTotalDiscount);
        }
    };

    const fetchProducts = () => {
        const storedProducts = JSON.parse(localStorage.getItem('cart'));
        if (storedProducts) {
            const initialQuantityMap = {};
            storedProducts.forEach((product) => {
                initialQuantityMap[product._id] = 1;
            });
            setQuantityMap(initialQuantityMap);
            setProducts(storedProducts);

            let total = 0;
            let totalDiscount = 0;

            storedProducts.forEach((product) => {
                total += parseFloat(product.price);
                totalDiscount += parseFloat(product.price) * parseFloat(product.discount) / 100;
            });
            console.log(total);
            setTotal(total);
            setTotalDiscount(totalDiscount);
        }

    };

    const deleteItem = (id) => {
        const updatedProducts = products.filter(product => product._id !== id);
        const deletedProduct = products.find(product => product._id === id);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        setQuantityMap(prevMap => {
            const updatedMap = { ...prevMap };
            delete updatedMap[id];
            return updatedMap;
        });

        let newTotal = total - (parseFloat(deletedProduct.price) * quantityMap[id]);
        let newTotalDiscount = totalDiscount - (parseFloat(deletedProduct.price) * parseFloat(deletedProduct.discount) / 100) * quantityMap[id];
        setTotal(newTotal);
        setTotalDiscount(newTotalDiscount);
    }


    const addAddress = () => {

        if (doorNo.trim() !== '' && area.trim() !== '' && city.trim() !== '' && pincode.trim() !== '') {
            localStorage.setItem('address', JSON.stringify({ doorNo, area, city, pincode }));
            toast.success(
                'Address added!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            console.log("All inputs are filled. Adding address...");
        } else {
            toast.error(
                'Please fill all the fields!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const placeOrder = () => {
        if ((products.length > 0) && (doorNo.trim() !== '' && area.trim() !== '' && city.trim() !== '' && pincode.trim() !== '') && ((cod == true) || (selectedOption !== null && holdername.trim() !== '' && cardNumber.trim() !== '' && expiryDate.trim() !== '' && cvv.trim() !== ''))) {
            console.log("products.length:", products.length);
            toast.success('Order Placed', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setOrdered(true);
            setOrderedItems(products);
            setProducts([]);
            setTotal(0);
            setTotalDiscount(0);
            localStorage.removeItem('cart');
        }
        else {
            toast.error('Please select payment method and address', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    const toggle = () => {
        if (cod == true) {
            setCod(false);
        }
        else {
            setCod(true);
        }
    }

    const handleProfileClick = () => {
        setShowProfile(true);
        document.body.style.overflow = 'hidden';
    }

    const handleCloseModal = () => {
        setShowProfile(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <Sutton>
            <div className="nav">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontSize: 40, fontWeight: 500, fontFamily: 'Protest Riot, sans-serif' }}>
                        HungryFood
                    </div>
                    <div className="separator"></div>
                    <div>Check Out</div>
                </div>
                <div className="links" style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', cursor: 'pointer', color: "rgb(239, 79, 95)" }}
                    >
                        <IoHome />
                        <div className="text">home</div>
                    </div>
                    <div className="help">
                        <MdOutlineHelpOutline />
                        <div className="text">
                            <a style={{ textDecoration: 'none' }} href="https://mail.google.com/mail/u/0/#inbox">
                                help
                            </a>
                        </div>
                    </div>
                    <div className="profile" onClick={handleProfileClick}>
                        <CgProfile />
                        <div className="text">Profile</div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="box1">
                    <div className="heading" style={{ fontSize: '30px' }}>
                        Your Cart
                    </div>

                    {products.map((product, index) => (

                        <div key={index} style={{ display: 'flex', padding: "5px", alignItems: 'center', justifyContent: "space-between", gap: '10px', backgroundColor: "#e9ecee" }}>
                            <img src={product.photo} style={{ height: '50px', width: '50px' }} />
                            <div style={{ width: "18vw" }}>
                                <div className="name" style={{ fontWeight: "600" }}>{product.name}</div>
                                <div className="restaurant" style={{ fontSize: '12px' }}>{product.restaurant}</div>
                            </div>
                            <div className="price">$ {product.price}</div>
                            <div className="quantity-updater">
                                <div className="quantity-box" onClick={() => handleQuantityIncrement(product)}>+</div>
                                <div className="quantity-box" >{parseInt(quantityMap[product._id])}</div>
                                <div className="quantity-box" onClick={() => handleQuantityDecrement(product)}>-</div>
                            </div>
                            <div className="delete" onClick={() => deleteItem(product._id)}><MdOutlineDelete style={{ cursor: "pointer", fontSize: "25px" }} /></div>
                        </div>

                    ))}

                    <div className="heading" style={{ fontSize: '28px', borderTop: "1px dashed #413c3c47", paddingTop: "20px" }}>
                        Payment
                        <main id='payment'>
                            <div className="cardPayment">
                                <div style={{ fontSize: '28px', fontWeight: '500', textAlign: 'center', margin: "20px" }}>Card Payment</div>
                                <div className="logo" style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '2.5vw', margin: '30px' }}>
                                    <div className="rupay" style={{ display: 'flex', alignItems: "center", gap: '10px' }}>
                                        <input
                                            type="checkbox"
                                            value="rupay"
                                            style={{ width: "20px", height: "20px" }}
                                            checked={selectedOption === "rupay"}
                                            onChange={() => handleCheckboxChange("rupay")}
                                        />
                                        <label htmlFor="rupay" style={{ display: 'flex', alignItems: "center", gap: '10px' }} >
                                            <img style={{ height: "30px", width: "100px" }} src='data:image/png;base64,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' />
                                        </label>
                                    </div>
                                    <div className="visa" style={{ display: 'flex', alignItems: "center", gap: '10px' }}>
                                        <input
                                            type="checkbox"
                                            value="visa"
                                            style={{ width: "20px", height: "20px" }}
                                            checked={selectedOption === "visa"}
                                            onChange={() => handleCheckboxChange("visa")}
                                        />
                                        <label htmlFor="visa" style={{ display: 'flex', alignItems: "center", gap: '10px' }}>
                                            <img style={{ height: "25px", width: "80px" }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' />
                                        </label>
                                    </div>
                                </div>


                                <div className="firstRow" style={{ display: 'flex', justifyContent: "center" }}>
                                    <div className="cn">
                                        <label>Card Number</label>
                                        <input type="text" onChange={(e) => setCardNumber(e.target.value)} required placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="cvv">
                                        <label>CVV</label>
                                        <input type="text" onChange={(e) => setCvv(e.target.value)} required placeholder="123" />
                                    </div>
                                </div>
                                <div className="secondRow" style={{ display: 'flex', justifyContent: "center" }}>
                                    <div className="holder">
                                        <label type="text">Card Holder Name</label>
                                        <input type="text" onChange={(e) => setHolderName(e.target.value)} required placeholder="Card Holder Name" />
                                    </div>
                                    <div className="exp">
                                        <label>Expiry</label>
                                        <input type="text" onChange={(e) => setExpiryDate(e.target.value)} required placeholder="MM/YY" />
                                    </div>
                                </div>

                            </div>
                            <div style={{ display: "flex", margin: "30px", justifyContent: "center" }}><div onClick={placeOrder} className="orderNow" style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '1vw' }}><div>Proceed to Payment</div> <MdOutlinePayment /></div></div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>OR</div>
                            <div className="cod" style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '2.5vw' }}>
                                <input type="checkbox" checked={cod === true} onChange={() => toggle()} value="COD" style={{ width: "20px", height: "20px" }} />
                                <label htmlFor="payment">Cash on Delivery</label>
                            </div>
                            <div style={{ display: "flex", margin: "40px", justifyContent: "center" }}><div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '1vw' }} onClick={placeOrder} className="orderNow"><div>PLACE ORDER NOW</div><MdDeliveryDining fontSize={28} /></div></div>
                        </main>
                    </div>

                </div>
                <div className="box2">

                    <div className="bill">
                        <div className="heading" style={{ fontSize: '28px' }}>
                            Bill Details
                        </div>
                        <ul>
                            <div className="nocontact" style={{ padding: "10px", border: '1px solid', display: "flex", flexDirection: "column", gap: "10px" }}>
                                <div className="header" style={{ fontSize: '16px' }}>Opt in for No-contact Delivery</div>
                                <main style={{ fontSize: '12px' }}>
                                    Unwell, or avoiding contact? We always prefer no-contact delivery. Partner will safely place the order outside your door (not for COD)
                                </main>
                            </div>
                            <li><div>Item Total</div><div>$ {total.toFixed(2)}</div></li>
                            <li><div>Delivery Partner Fee</div><div>$ {(total * 0.02).toFixed(2)}</div></li>
                            <li><div>Platform Fee</div><div>$ {(total * 0.02).toFixed(2)}</div></li>
                            <li><div>GST charges</div><div>$ {(total * 0.14).toFixed(2)}</div></li>
                            <li><div>Discount</div><div>-  $ {totalDiscount.toFixed(2)}</div></li>
                        </ul>

                        <span><div>To Pay</div><div>$ {(total + total * 0.02 * 2 + total * 0.01 - totalDiscount).toFixed(2)}</div></span>
                    </div>
                    <div className="address">
                        <div className="adr">Address</div>
                        <main style={{ fontSize: '14px', display: "flex", flexDirection: "column", gap: "10px" }}>
                            <input
                                required
                                type='text'
                                placeholder='Door or Flat No.'
                                value={doorNo}
                                onChange={(e) => setDoorNo(e.target.value)}
                            />
                            <input
                                required
                                type='text'
                                placeholder='Area or Landmark'
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            />
                            <input
                                required
                                type='text'
                                placeholder='City'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                required
                                type='text'
                                placeholder='Pincode'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <span onClick={addAddress} className='addAddress'>ADD</span>
                            </div>
                        </main>
                    </div>

                </div>
            </div>
            <div style={{ margin: '2vh', marginBottom: "0%", padding: '2vh' }}>
                {ordered ? (
                    <div className="placedOrders">
                        <div className="heading" style={{ fontSize: "30px", display: "flex", alignItems: "center" }}>PREVIOUS ORDERS</div>
                        {orderedItems.map((product, index) => (
                            <div key={index} style={{ margin: '10px', padding: "80px", display: 'flex', padding: "5px", alignItems: 'center', justifyContent: "space-between", gap: '10px', backgroundColor: "#e9ecee" }}>
                                <img src={product.photo} style={{ height: '50px', width: '50px' }} />
                                <div style={{ width: "18vw" }}>
                                    <div className="name" style={{ fontWeight: "600" }}>{product.name}</div>
                                    <div className="restaurant" style={{ fontSize: '12px' }}>{product.restaurant}</div>
                                </div>
                                <div className="price">$ {product.price}</div>
                                <div >{parseInt(quantityMap[product._id])} items</div>
                                <div style={{ display: "flex", alignItems: "center", gap: '10px' }}><div>  Delivered</div><IoMdCheckmarkCircleOutline color='green' /></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="placedOrders" style={{ fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}>NO ORDERS YET</div>
                )}
            </div>


            <ToastContainer />
            {showProfile && (
                <UserProfile onClose={handleCloseModal} />
            )}
        </Sutton>
    );
};

export default Cart;

const Sutton = styled.div`
font-family: 'Poppins', sans-serif;
background-color: #e9ecee;
.placedOrders{
    margin-top: 3vw;
    padding: 5vw;
    background-color: white;
}
.cardPayment input{
    font-size: 15px;
    padding: 10px;
    color: #413c3c;
    border:0.5px solid #413c3c47;
    width:20vw;
    border-radius: 3px;
}
.orderNow{
    font-size:20px;
    cursor: pointer;
    padding: 8px;
    padding-right: 20px;
    padding-left: 20px;
    color:white;
    background-color: green;
    border-radius: 6px;
}
.cn,.cvv,.holder,.exp{
    display: flex;
    flex-direction: column;
    padding: 10px;
}
#payment{
    background-color: #f4f5f7;
    padding: 20px;
}
#payment label{
    font-size: 20px;
}
.addAddress{
    border: 1px solid green;
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: green;
    padding: 3px;
    width: 50px;
    cursor: pointer;
}
.adr{
    font-size: 25px;
}
.address{
background-color: #f7f3f3;
padding: 10px;
}
.address input{
    padding: 8px;
    width: 90%;
    border:0.5px solid #413c3c47;
    border-radius: 3px;
}
span{
    display: flex;
    justify-content: space-between;
    font-size: 23px;
    margin: 10px;
}
ul{
    list-style-type: none;
    border-bottom: 2px dashed #413c3c47;
    padding: 20px;
    padding-bottom: 30px;
    background-color: #eff2f3;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
li{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: #696363;
    font-size: 18px;
}
.quantity-updater{
    display: flex;
    gap:1px;
}
.quantity-box{
    border:1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    height: 12px;
    width: 12px;
    font-size:12px ;
    cursor:pointer;
}
.profile{
    color:green;
    font-weight: 590;
}
.separator {
    border-left: 1px solid #413c3c47;
    height: 40px; 
    margin: 0 10px;
}
.nav{
    display:flex;
    justify-content: space-between;
    font-size: 25px;
    font-weight: 590;
    padding: 20px;
    border-bottom: 0.2px #81737349 solid;
    background-color: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
}
.links{
    display:flex;
    justify-content: space-between;
    gap:5vw;
    font-size: 20px;
}
.help,.profile{
    display:flex;
    align-items: center;
    gap:5px;
    cursor:pointer;
}
.main{
    display:flex;
    justify-content: space-evenly;
    padding-top: 10vh;
    padding-bottom: 10vh;
    font-family: "Poppins", sans-serif;
  font-weight: 590;
  font-style: normal;
}
.box1{
    background-color: white;
    min-height:75vh;
    width: 60vw;
    padding: 5vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
}
.box2{
    background-color: white;
    width: 22vw;
    padding: 5vh;
    font-size:28px;
    display: flex;
    flex-direction: column;
    gap: 5vh;
}
`;
