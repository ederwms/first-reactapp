import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './style.css'

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  }
  
  //* Este médodo é executado assim que o componente é mostrado em tela. Para efeito de comparação é como se fosse o mounted() do VueJS
  componentDidMount() {
    this.loadProducts()
  }

  //* Utilizando arrow function por causa do escopo, arrow function não sobrescreve o valor do "this"
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products/?page=${page}`)
    const { docs, ...productInfo } = response.data
    this.setState({
      products: docs, productInfo
    })
    this.setState({ products: docs, productInfo, page })
  }

  prevPage = () => {
    const { page } = this.state
    if (page === 1) return

    const pageNumber = page - 1
    this.loadProducts(pageNumber)
  }
  //* next page method
  nextPage = () => {
    const { page, productInfo } = this.state
    if (page === productInfo.pages) return

    const pageNumber = page + 1
    this.loadProducts(pageNumber)
  }

  render() {
    const { products, page, productInfo } = this.state
    return (
      <div className="product-list">
        { products.map((product) => (
          <article key={product._id}>
            <strong> { product.title } </strong>
            <p> { product.description } </p>
            <Link to={`/products/${product._id}`}> Acessar </Link>
          </article>
        )) }
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
        <div className="pages-info">
          <strong>Página {page} de {productInfo.pages}</strong>
        </div>
      </div>
    )
  }
}