import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/main'
import Product from './pages/product'
import NewProduct from './pages/newproduct'
import EditProduct from './pages/editproduct'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/:id" component={Product} />
      <Route path="/newproduct" component={NewProduct} />
      <Route path="/editproduct/:id" component={EditProduct} />
    </Switch>
  </BrowserRouter>
)

export default Routes
