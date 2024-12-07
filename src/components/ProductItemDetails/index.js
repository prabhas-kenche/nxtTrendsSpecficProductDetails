import React, {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productDetails: {},
      similarProducts: [],
      quantity: 1,
    }
  }

  componentDidMount() {
    const {location} = this.props
    if (location.state && location.state.productDetails) {
      const {productDetails} = location.state
      // Mock similar products
      const mockSimilarProducts = [
        {
          id: '101',
          title: 'Similar Product 1',
          brand: 'Brand X',
          imageUrl: 'https://via.placeholder.com/150',
          rating: 4.2,
          price: 300,
          category: productDetails.category,
        },
        {
          id: '102',
          title: 'Similar Product 2',
          brand: 'Brand Y',
          imageUrl: 'https://via.placeholder.com/150',
          rating: 4.0,
          price: 400,
          category: productDetails.category,
        },
      ]
      this.setState({productDetails, similarProducts: mockSimilarProducts})
    }
  }

  increaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseQuantity = () => {
    this.setState(prevState => ({
      quantity: Math.max(1, prevState.quantity - 1),
    }))
  }

  render() {
    const {productDetails, similarProducts, quantity} = this.state
    const {title, brand, imageUrl, rating, price} = productDetails

    return (
      <div>
        <Header />
        <div className="product-item-details">
          <div>
            <img src={imageUrl} alt="product" className="thumbnail" />
          </div>
          <div>
            <h1 className="title">{title}</h1>
            <p className="brand">by {brand}</p>
            <div className="product-details">
              <p className="price">Rs {price}/-</p>
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <div className="quantity-controller">
                <BsDashSquare
                  onClick={this.decreaseQuantity}
                  className="icon"
                />
                <span className="quantity">{quantity}</span>
                <BsPlusSquare
                  onClick={this.increaseQuantity}
                  className="icon"
                />
              </div>
            </div>
          </div>
        </div>
        <h2>Similar Products</h2>
        <ul className="similar-products-list">
          {similarProducts.map(product => (
            <SimilarProductItem key={product.id} productData={product} />
          ))}
        </ul>
      </div>
    )
  }
}

export default ProductItemDetails
