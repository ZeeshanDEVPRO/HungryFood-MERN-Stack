import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Foodmenu = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      window.location.href = '/home';
    } else {
      fetchProducts();
    }
  }, [localStorage.getItem('user')]);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    if (value !== '') {
      searchHandle({ target: { value } });
    }
    else {
      fetchProducts();
      setSearchTerm('');
    }
  };

  const fetchProducts = async () => {
    try {
      const type = "product";
      const url = new URL(`https://hungry-food-mern-stack.vercel.app/allproducts`);
      url.searchParams.append("type", type);

      const response = await fetch(url, {
        method: "get",
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    const type = "product";
    setSearchTerm(key);
    if (key) {
      try {
        const url = new URL(`https://hungry-food-mern-stack.vercel.app/search/${key}`);
        url.searchParams.append("type", type);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const searchData = await response.json();
        setProducts(searchData);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      fetchProducts();
    }
  };

  const takeToCart = (id) => {
    if (cartItems.some(item => item._id === id)) {
      toast.warning(
        'Item already in the cart !', {
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
      return;
    }
    const selectedItem = products.find((product) => product._id === id);
    if (selectedItem) {
      const updatedCart = [...cartItems, selectedItem];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(
        'Item added to the Cart !', {
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


  const goToCart = () => {
    navigate("/cart");
  }

  return (
    <Button>
      <div className="top">
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div className="text" style={{ fontSize: "3vw", fontWeight: "400" }}>HungryFood</div>
          <img style={{ width: "3vw", height: "3vw" }} src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" />
        </div>
        <div
          className="nav"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "5vw",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
         
          <div onClick={() => navigate("/about")}>About</div>
          <div
            className="cart"
            style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}
            onClick={goToCart}
          >
            <div className="cart-wrap">
              <IoCartOutline style={{ fontSize: "2rem" }} />
              <span className="cart-items--count">{cartItems.length}</span>
            </div>
            <div className="text">My Cart</div>
          </div>
        </div>
      </div>

      <div className="tit">Order the best Food from near you</div>
      <input
        type="text"
        placeholder="search for cuisine or a dish or restaurant"
        value={searchTerm}
        onChange={searchHandle}
        style={{ marginBottom: "5vh" }}
      />

      <div className="buttons">
        <button
          className="btn"
          value={""}
          onClick={(e) => handleButtonClick(e.target.value)}
          style={{ backgroundColor: activeButton === "" ? "darkgray" : "" }}
        >
          All Items
        </button>
        <button
          className="btn"
          value={"burger"}
          onClick={(e) => handleButtonClick(e.target.value)}
          style={{ backgroundColor: activeButton === "burger" ? "darkgray" : "" }}
        >
          Burger
        </button>
        <button
          className="btn"
          value={"pizza"}
          onClick={(e) => handleButtonClick(e.target.value)}
          style={{ backgroundColor: activeButton === "pizza" ? "darkgray" : "" }}
        >
          Pizza
        </button>
        <button
          className="btn"
          value={"biryani"}
          onClick={(e) => handleButtonClick(e.target.value)}
          style={{ backgroundColor: activeButton === "biryani" ? "darkgray" : "" }}
        >
          Biryani
        </button>
        <button
          className="btn"
          value={"beverages"}
          onClick={(e) => handleButtonClick(e.target.value)}
          style={{ backgroundColor: activeButton === "beverages" ? "darkgray" : "" }}
        >
          Beverages
        </button>
      </div>


      <div className="container">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div className="card" key={index} >
              <img id="cardimage" src={item.photo} alt={item.name} />
              <div className="details">
                <div className="div1">
                  <h3 className="name" style={{ padding: "5px" }}>
                    {item.name}
                  </h3>
                  <div
                    className="rating"
                    style={{
                      padding: "5px",
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "2px",
                    }}
                  >
                    {" "}
                    {item.discount}% off
                  </div>
                </div>
                <div className="outerDiv">
                  <div className="div2">
                    <p className="restaurant">{item.restaurant}</p>
                    <p className="discount">
                      <img
                        id="star"
                        src="data:image/jpeg;base64,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"
                      />
                      {item.ratings}
                    </p>
                  </div>
                  <p
                    className="price"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    $ {item.price}
                  </p>
                </div>
              </div>
              <div className="order" onClick={() => takeToCart(item._id)}>Take to cart<IoCartOutline fontSize={30} /></div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: "35px", marginTop: "5vh" }}>
            No Matching results as of now
          </div>
        )}
      </div>
      <ToastContainer />
    </Button>
  );
};

export default Foodmenu;

const Button = styled.div`
  margin-bottom: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5vh;
  font-family: "Poppins", sans-serif;

  .cart-wrap{
    position:relative;
  }
  .order{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(175, 192, 24);
    color:white;
    border-radius:6px ;
    padding: 4px;
  }
  .cart-items--count{
    position:absolute;
    top:0;
    right:0;
    font-size:15px;
    background:white;
    color:black;
    width:18px;
    height:18px;
    display:grid;
    place-content:center;
    border-radius:20px;
  }
  .text{
    font-size: 15px;
  }
  .cart {
    padding: 10px;
    border-radius: 10px;
    background-color: green;
    color: white;
  }
  .logo {
    font-family: "Poppins", sans-serif;
    font-family: "Protest Riot", sans-serif;
    font-size: 40px;
  }
  .top {
    border-bottom: 0.2px #81737349 solid;
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 40px);
    padding: 20px;
    top: 0;
    position: fixed;
    z-index: 1;
    background-color: rgb(250, 248, 249)
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .btn {
    font-size: 15px;
    padding: 15px;
    border-radius: 10px;
    border:none;
    cursor: pointer;
    background-color: rgb(240, 234, 235);
  }

  .discount {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .div2 {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .outerDiv {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .div1 {
    display: flex;
    justify-content: space-between;
  }
  #star {
    max-width: 18px;
    max-height: 18px;
  }
  .container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  margin-bottom: 5vh;
}

.card {
  width: 25vw; 
  background-color: #ebe7e7;
  margin: 10px; 
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

#cardimage {
  height: 200px;
  width: 100%; 
  border-radius: 5px;
}

  .card:hover {
    transform: scale(1.05);
  }

  .tit {
    font-size: 28px;
    margin-top: 25vh;
  }
  input {
    min-height: 50px;
    border-radius: 10px;
    border: 0.2px #81737349 solid;
    min-width: 50vw;
    font-size: 16px;
    padding-left: 20px;
  }

  .in {
    padding: 8px;
  }
  .head {
    display: flex;
    gap: 14vh;
    justify-content: center;
    margin: 5vh;
    font-family: "Poppins", sans-serif;
  }
  
`;
