import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage} from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
  it('display the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
    `;


    const producId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const producId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: producId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: producId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-products-quantity-${producId1}`).innerText
    ).toContain('Quantity: 2');
  });
});