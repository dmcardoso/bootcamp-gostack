import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import { ProductList } from './styles';

import { formatPrice } from '../../util/format';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

function Home({ addToCartRequest, amount }) {
    const [produts, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('products');

            const data = response.data.map((product) => ({
                ...product,
                priceFormatted: formatPrice(product.price),
            }));

            setProducts(data);
        }

        getProducts();
    }, []);

    function handleAddProduct(product) {
        addToCartRequest(product.id);
    }

    return (
        <ProductList>
            {produts.map((product) => (
                <li key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>

                    <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                    >
                        <div>
                            <MdAddShoppingCart size={16} color="#FFF" />
                            {` ${amount[product.id] || 0}`}
                        </div>

                        <span>ADICIONAR AO CARRINHO</span>
                    </button>
                </li>
            ))}
        </ProductList>
    );
}

const mapStateToProps = (state) => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {}),
});

const mapDispatchToProps = (dispatch) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
