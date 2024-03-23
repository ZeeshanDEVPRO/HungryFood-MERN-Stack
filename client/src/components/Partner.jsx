import { useState, useEffect, useRef, useParams } from 'react'
import styled from 'styled-components'
import { CgProfile } from "react-icons/cg";
import { MdOutlineHelpOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PartnerProfile from './PartnerProfile';

const Partner = () => {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [itemId, setItemId] = useState('');
  const [addFileName, setAddFileName] = useState("no file selected");
  const [updateFileName, setUpdateFileName] = useState("no file selected");
  const [showProfile, setShowProfile] = useState(false);

  const [addformData, setAddFormData] = useState({
    name: '', price: '', category: '', restaurant: '', ratings: '', discount: '', photo: null
  });
  const [updateformData, setUpdateFormData] = useState({
    name: "", price: '', category: '', restaurant: '', ratings: '', discount: '', photo: null
  });

  const addinputFileRef = useRef(null);
  const updateinputFileRef = useRef(null);

  useEffect(() => {
    const auth = localStorage.getItem('partner');
    if (!auth) {
      window.location.href = '/home';
    } else {
      fetchProducts();
    }
  }, [localStorage.getItem('partner')]);

  const addhandleFileChange = (files) => {
    if (files.length > 0) {
      const newFileName = files[0].name;
      if (newFileName !== addFileName) {
        setAddFileName(newFileName);
        setAddFormData({ ...addformData, photo: files[0] });
      }
    }
  };

  const addhandleDelete = () => {
    setAddFormData({ ...addformData, photo: null });
    setAddFileName("no file selected");
    console.log("Image:", addformData.photo);
    console.log("FileName:", addFileName);

    if (addinputFileRef.current) {
      addinputFileRef.current.value = "";
    }
  };

  const updatehandleFileChange = (files) => {
    if (files.length > 0) {
      const newFileName = files[0].name;
      if (newFileName !== updateFileName) {
        setUpdateFileName(newFileName);
        setUpdateFormData({ ...updateformData, photo: files[0] });
      }
    }
  };

  const updatehandleDelete = () => {
    setUpdateFormData({ ...updateformData, photo: null });
    setUpdateFileName("no file selected");
    console.log("Image:", updateformData.photo);
    console.log("FileName:", updateFileName);

    if (updateinputFileRef.current) {
      updateinputFileRef.current.value = "";
    }
  };

  console.log("Image:", updateformData.photo);
  console.log("FileName:", updateFileName);

  const fetchProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const type = "dummyProduct";
      const url = new URL(`https://hungry-food-mern-stack.vercel.app/allproducts`);
      url.searchParams.append("type", type);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    const type = "dummyProduct";
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

  const handleButtonClick = (value) => {
    setActiveButton(value);
    searchHandle({ target: { value } });
  };
  const sendToUpdate = (item) => {
    setItemId(item._id);
    console.log(item.name);
    setUpdateFormData({ name: item.name, price: item.price, category: item.category, restaurant: item.restaurant, ratings: item.ratings, discount: item.discount, photo: item.photo })
    console.log(updateformData);
    const updateDiv = document.querySelector('.update');
    if (updateDiv) {
      updateDiv.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(itemId);
  }

  const deleteDummy = async (item) => {
    console.log(item._id);
    let result = await fetch(`https://hungry-food-mern-stack.vercel.app/delete/${item._id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      fetchProducts();
      toast.success('Deletion successfull!', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    else {
      toast.error('We encountered some error!', {
        position: "bottom-center",
        autoClose: 4000,
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

  const updateDummy = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updateformData.name);
      formData.append('price', updateformData.price);
      formData.append('category', updateformData.category);
      formData.append('restaurant', updateformData.restaurant);
      formData.append('ratings', updateformData.ratings);
      formData.append('discount', updateformData.discount);
      formData.append('type', 'dummy');
      if (updateformData.photo !== null) {
        formData.append('photo', updateformData.photo);
      }

      let result = await fetch(`https://hungry-food-mern-stack.vercel.app/update/${itemId}`, {
        method: 'put',
        body: formData,
      });

      if (result.ok) {
        result = await result.json();
        setItemId('');
        toast.success('Product Updated Successfully', {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setUpdateFormData({ name: '', price: '', category: '', restaurant: '', ratings: '', discount: '', photo: null })
      } else {
        console.error('Failed to update item:', result.status);
        toast.error('We encountered some error!', {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('We encountered some error!', {
        position: "bottom-center",
        autoClose: 4000,
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

  const addDummy = async () => {
    if (
      addformData.name === '' ||
      addformData.photo === null ||
      addformData.price === '' ||
      addformData.restaurant === '' ||
      addformData.category === '' ||
      addformData.ratings === '' ||
      addformData.discount === ''
    ) {
      setError(true);
      return false;
    }

    const formData = new FormData();
    formData.append('name', addformData.name);
    formData.append('price', addformData.price);
    formData.append('category', addformData.category);
    formData.append('restaurant', addformData.restaurant);
    formData.append('ratings', addformData.ratings);
    formData.append('discount', addformData.discount);
    formData.append('type', 'dummy');

    formData.append('photo', addformData.photo);

    try {
      const result = await fetch(`https://hungry-food-mern-stack.vercel.app/upload`, {
        method: 'POST',
        body: formData,
      });
      if (result.ok) {
        const data = await result.json();

        toast.success('Product Added Successfully', {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setAddFormData({ name: '', price: '', category: '', restaurant: '', ratings: '', discount: '', photo: null })
      } else {
        toast.error('We encountered some error!', {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        console.error('Failed to upload product:', result.statusText);
      }
    } catch (error) {
      toast.error('We encountered some error!', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error('Error uploading product:', error);

    }
  };

  const handleCloseModal = () => {
    setShowProfile(false);
    // document.body.style.overflow = 'auto';
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    // document.body.style.overflow = 'hidden';
  }


  return (
    <Button>
      <div className="top">
        <div className="nav">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: 40, fontWeight: 500, fontFamily: 'Protest Riot, sans-serif' }}>HungryFood</div>
            <div className="separator"></div>
            <div>Partner Page</div>
          </div>
          <div className="links">
            <div className='help'><MdOutlineHelpOutline /><div className="text"><a style={{ textDecoration: "none" }} href='https://mail.google.com/mail/u/0/#inbox'>help</a></div></div>
            <div className='profile' onClick={handleProfileClick}><CgProfile /><div className="text">Profile</div></div>
          </div>
        </div>
      </div>
      <div className='warn'>
        <CiWarning fontSize={20} /> Note: All the operations such as new product addition, deletion or updation will be performed in the dummy collection. This is important check to ensure that the project UI/UX does not gets altered due to some unintentional or unwanted changes. Nonetheless your changes will be displayed here!
      </div>
      <div className="componenet">
        <div className="add">
          <div className="title">Add Product</div>

          <div className="name" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div >Name</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, name: e.target.value })} placeholder='Burger SM-10' />
          </div>
          <div className="price" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Price</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, price: e.target.value })} placeholder='$12' />
          </div>
          <div className="category" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Category</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, category: e.target.value })} placeholder='burger' />
          </div>
          <div className="restaurant" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Restaurant</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, restaurant: e.target.value })} placeholder='The Park' />
          </div>
          <div className="ratings" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Ratings</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, ratings: e.target.value })} placeholder=' 4.5/5' />
          </div>
          <div className="discount" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Discount</div>
            <input type='text' onChange={(e) => setAddFormData({ ...addformData, discount: e.target.value })} placeholder='10%' />
          </div>

          <main>
            <form onClick={() => addinputFileRef.current.click()}>
              <input
                type="file"
                accept="image/*"
                className="input-field"
                ref={addinputFileRef}
                hidden
                onChange={({ target: { files } }) => addhandleFileChange(files)}
              />

              {addformData.photo ? (
                <img src={addformData.photo} width={70} height={70} alt={addFileName} />
              ) : (
                <>
                  <MdCloudUpload color="#321868" size={60} />
                  <p>Browse Files</p>
                </>
              )}
            </form>

            <section className="uploaded-row">
              <AiFillFileImage color="#321868" />
              <span className="upload-content">
                {addFileName}
                {addformData.photo && (
                  <MdDelete
                    onClick={addhandleDelete}
                  />
                )}
              </span>
            </section>
          </main>

          <div className="final">
            <button id='addbtn' onClick={addDummy}>ADD</button>
          </div>
        </div>

        <div className="update">

          <div className="title">Update Product</div>

          <div className="name" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div >Name</div>
            <input type='text' placeholder='Burger SM-10' value={updateformData.name} onChange={(e) => setUpdateFormData({ ...updateformData, name: e.target.value })} />
          </div>
          <div className="price" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Price</div>
            <input type='text' placeholder='$12' value={updateformData.price} onChange={(e) => setUpdateFormData({ ...updateformData, price: e.target.value })} />
          </div>
          <div className="category" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Category</div>
            <input type='text' placeholder='burger' value={updateformData.category} onChange={(e) => setUpdateFormData({ ...updateformData, category: e.target.value })} />
          </div>

          <div className="restaurant" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Restaurant</div>
            <input type='text' placeholder='The Park' value={updateformData.restaurant} onChange={(e) => setUpdateFormData({ ...updateformData, restaurant: e.target.value })} />
          </div>
          <div className="ratings" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Ratings</div>
            <input type='text' placeholder=' 4.5/5' value={updateformData.ratings} onChange={(e) => setUpdateFormData({ ...updateformData, ratings: e.target.value })} />
          </div>
          <div className="discount" style={{ color: 'rgb(79,79,79)', fontSize: "21px", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <div>Discount</div>
            <input type='text' placeholder='10%' value={updateformData.discount} onChange={(e) => setUpdateFormData({ ...updateformData, discount: e.target.value })} />
          </div>

          <main>
            <form onClick={() => updateinputFileRef.current.click()}>
              <input
                type="file"
                accept="image/*"
                className="input-field"
                ref={updateinputFileRef}
                hidden
                onChange={({ target: { files } }) => updatehandleFileChange(files)}
              />

              {updateformData.photo ? (
                <img src={updateformData.photo} width={70} height={70} alt={updateFileName} />
              ) : (
                <>
                  <MdCloudUpload color="#321868" size={60} />
                  <p>Browse Files</p>
                </>
              )}
            </form>

            <section className="uploaded-row">
              <AiFillFileImage color="#321868" />
              <span className="upload-content">
                {updateFileName}
                {updateformData.photo && (
                  <MdDelete
                    onClick={updatehandleDelete}
                  />
                )}
              </span>
            </section>
          </main>

          <div className="final">
            <button id='updatebtn' onClick={updateDummy}>UPDATE</button>
          </div>
        </div>
      </div>

      <div className="content">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="tit">Find all your listed products here</div>
          <input
            id='searchInput'
            type="text"
            placeholder="search for cuisine or a dish or restaurant"
            value={searchTerm}
            onChange={searchHandle}
            style={{ marginBottom: "5vh" }}
          />
        </div>

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
                  <div className="divv1">
                    <h3 className="name" style={{ padding: "5px", fontSize: '20px' }}>
                      {item.name}
                    </h3>
                    <div
                      className="rating"
                      style={{
                        padding: "5px",
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "2px",
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      {item.discount} off
                    </div>
                  </div>
                  <div className="outerDiv">
                    <div className="divv2">
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
                      {item.price}
                    </p>
                  </div>
                </div>
                <div className="order updateButton" onClick={() => { sendToUpdate(item) }}>Update</div>
                <div className="order deleteButton" style={{ backgroundColor: "rgb(206, 56, 45)", marginTop: '5px' }} onClick={() => { deleteDummy(item) }}>Delete</div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: "35px", marginTop: "5vh" }}>
              No Matching results as of now
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      {showProfile && (
        <PartnerProfile onClose={handleCloseModal} />
      )}
    </Button>
  )
}

export default Partner

const Button = styled.div`
font-family: 'Poppins', sans-serif;
background-color: #e9ecee;
.updateButton:hover{
  transform: scale(1.02);
}
.deleteButton:hover{
  transform: scale(1.02);
}
.content{
  background-color: white;
  padding-top: 5vh;
  padding-bottom: 5vh;
}
#star {
    max-width: 18px;
    max-height: 18px;
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
.divv1 {
   display: flex;
   justify-content: space-between;
  }
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 
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
.card:hover {
    transform: scale(1.03);
  }

#cardimage {
  height: 200px;
  width: 100%;
  border-radius: 5px;
}
#searchInput{
    min-height: 40px;
    border-radius: 10px;
    border: 0.2px #81737349 solid;
    min-width: 50vw;
    font-size: 16px;
    padding-left: 20px;
    background-color:rgb(248, 248, 252);
}
.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 5vh;
  }
  .btn {
    font-size: 15px;
    padding: 15px;
    border-radius: 10px;
    border:none;
    cursor: pointer;
    background-color: rgb(240, 234, 235);
  }
.tit {
    font-size: 28px;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
.final{
  display: flex;
  flex-direction: column;
  gap: 3vh;
  align-items: flex-end;
 }
#imageUpload{
  padding: 12px;
  border:1px solid #ccc;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  color: white;
  background-color:rgb(223, 47, 65);
  box-shadow: 0px 3px 5px rgba(0.1, 0.1, 0.1, 0.3);
  width: 17vw;
}
#addbtn,#updatebtn{
  background-color:white;
  padding: 5px;
  color:green;
  font-weight: 500;
  border:2px solid green;
  width: 10vw;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 3px 5px rgba(0.1, 0.1, 0.1, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7vw;
}

input {
    font-size: 17px;
    border: 1px solid #ccc; 
    border-radius: 5px;
    padding: 7px;
    width: 17.5vw;
    background-color:rgb(248, 248, 252);
  }

.div1,.div2,.div3{
  display: flex;
  justify-content: space-evenly;
}
.div1,.div2{
  font-weight: 600;
  font-size: 20px;
}
.title{
  font-size: 32px;
  font-weight: 500;
  color: rgb(79,79,79);
}
.add,.update{
  background-color: white;
  margin: 5vw;
  padding: 4vw;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 3vh;
  width: 70vw;
}
.componenet{
  display: flex;
  align-items: center;
  justify-content: center;
}
.warn {
    background-color: #c5e60fe1;
    font-size: 15px;
    padding: 20px;
    margin-top: 2vh;
}
.profile {
    color:green;
    font-weight: 500;
}
.separator {
    border-left: 1px solid #413c3c47;
    height: 40px; 
    margin: 0 10px;
}

.nav {
    display:flex;
    justify-content: space-between;
    font-size: 25px;
    font-weight: 500;
    padding: 20px;
    border-bottom: 0.2px #81737349 solid;
    background-color: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
}
.top{
  display: block;
  background: white;
}
.links {
    display:flex;
    justify-content: space-between;
    gap:5vw;
    font-size: 20px;
}
.help, .profile {
    display:flex;
    align-items: center;
    gap:5px;
    cursor:pointer;
}

main{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-end;
}
form{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border:2px dashed #5933aa;
  height:15vh;
  width:18vw;
  cursor:pointer;
  border-radius:5px
}

.uploaded-row{
  margin:10px 0;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:15px 20px;
  border-radius:5px;
  background-color:#e9f0ff;
}

.upload-content{
  display:flex;
  align-items:center;
}
`;
