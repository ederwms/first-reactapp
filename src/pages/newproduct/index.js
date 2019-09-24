import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../../services/api'

import './style.css'

export default class NewProduct extends Component {
  state = {
    title: '',
    description: '',
    url: '',
    form: false
  }

  handleChange = (event) => {
    const target = event.target
    const name = target.name
    this.setState({[name]: target.value})
  }

  handleSubmit = async (e) => {
    const { title, description, url } = this.state
    const newProduct = {
      title: title,
      description: description,
      url: url
    }
    e.preventDefault()
    if (!title || !description || !url) {
      alert('Preencha todos os campos.')
      this.setState({form: false})
    } else {
      await api.post(`/products`, newProduct)
      this.setState({form: true})
    }
  }

  render() {
    const { title, description, url } = this.state
    if (this.state.form) return <Redirect to="/"/>
    return (
      <div className="container">
        <h3>Cadastre um novo produto</h3>
        <div className="new-product">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Titulo: </label>
            <input id="title" name="title" type="text" value={title} onChange={this.handleChange}></input>

            <label htmlFor="desc">Descrição: </label>
            <input id="desc" name="description" type="text" value={description} onChange={this.handleChange}></input>

            <label htmlFor="url">URL: </label>
            <input id="url" name="url" type="text" value={url} onChange={this.handleChange}></input>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    )
  }
}