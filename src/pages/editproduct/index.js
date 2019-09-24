import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../../services/api'
import './style.css'

export default class EditProduct extends Component {
  state = {
    product: {},
    title: '',
    description: '',
    url: '',
    form: false
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const response = await api.get(`/products/${id}`)

    this.setState({
      title: response.data.title,
      description: response.data.description,
      url: response.data.url,
      product: response.data
    })
  }

  handleChange = (event) => {
    const target = event.target
    const name = target.name
    this.setState({[name]: target.value})
  }

  handleSubmit = async (e) => {
    const { title, description, url, product } = this.state
    const editedProduct = {
      title: title,
      description: description,
      url: url
    }
    e.preventDefault()
    if (!title || !description || !url) {
      alert('Preencha todos os campos.')
      this.setState({form: false})
    } else {
      await api.put(`/products/${product._id}`, editedProduct)
      this.setState({form: true})
    }
  }

  render() {
    const { title, description, url } = this.state
    if (this.state.form) return <Redirect to="/"/>
    return (
      <div className="container">
        <h3>Edição de produto</h3>
        <div className="product-edit">
          {/* <Link className="edit-product" to={`/`}>Salvar</Link> */}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="product-title">Título</label>
            <input id="product-title" name="title" value={title} onChange={this.handleChange}></input>

            <label htmlFor="product-description">Descrição</label>
            <input id="product-description" name="description" value={description} onChange={this.handleChange}></input>

            <label htmlFor="product-url">URL</label>
            <input id="product-url" name="url" value={url} onChange={this.handleChange}></input>

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    )
  }
}