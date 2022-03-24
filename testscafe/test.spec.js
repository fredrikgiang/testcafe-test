import { Selector, ClientFunction } from 'testcafe';

fixture `Swag Labs Demo`.page `https://www.saucedemo.com/`

test('Verify that Submit Button Exists', async t => {
  const submitButtonExists = Selector('#login-button').exists;

  await t.expect(submitButtonExists).ok();
});

test('Verify Locked Out User', async t =>  {

  /*Logs in with locked_out_user,
    verifies error message*/
  await t
      .typeText('#user-name.input_error.form_input', `locked_out_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)
      .click('#login-button')
      .expect(Selector('div').withText('Epic sadface: Sorry, this user has been locked out.').exists).ok();
});

test('Verify Standard User Purchase', async t =>  {

  /*Logs in with standard_user,
  adds 'Sauce Labs Onesie item to the cart,
  goes through the buy process,
  checks if the cart is empty after,
  and logs out*/
  await t
      .typeText('#user-name.input_error.form_input', `standard_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)
      .click('#login-button')
      .click('#add-to-cart-sauce-labs-onesie')
      .expect(Selector('#remove-sauce-labs-onesie').exists).ok()
      .click(Selector('.shopping_cart_badge').withText('1'))
      .click('#checkout')
      .typeText('#first-name.input_error.form_input', `Phil`)
      .typeText('#last-name.input_error.form_input', `the Tester`)
      .typeText('#postal-code.input_error.form_input', `90210`)
      .click('#continue')
      .click('#finish')
      .expect(Selector('.shopping_cart_badge').withText('1').exists).notOk()
      .click('#react-burger-menu-btn')
      .click('#logout_sidebar_link.bm-item.menu-item');
});

test('Verify Sorting (Low to High)', async t =>  {
  /* Login with standard_user,
  sort of products on 'Price (Low to High)'*/

  const prodSortCon = Selector('select').withAttribute('data-test', 'product_sort_container')

  await t
      .typeText('#user-name.input_error.form_input', `standard_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)
      .click('#login-button')
      .click(prodSortCon)
      .click(prodSortCon.find('option').withText('Price (low to high)'))
      .click('#react-burger-menu-btn')
      .click('#logout_sidebar_link.bm-item.menu-item');
});

test('Verify Problem User Purchase', async t =>  {

  /*Logs in with problem_user,
  adds 'Sauce Labs Onesie item to the cart,
  goes through the buy process,
  checks if the cart is empty after,
  and logs out */

  await t
      .typeText('#user-name.input_error.form_input', `problem_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)
      .click('#login-button')
      .click('#add-to-cart-sauce-labs-onesie')
      .expect(Selector('#remove-sauce-labs-onesie').exists).ok()
      .click(Selector('.shopping_cart_badge').withText('1'))
      .click('#checkout')
      .typeText('#first-name.input_error.form_input', `Phil`)
      .typeText('#last-name.input_error.form_input', `the Tester`)
      .typeText('#postal-code.input_error.form_input', `90210`)
      .click('#continue')
      .click('#finish')
      .expect(Selector('.shopping_cart_badge').withText('1').exists).notOk()
      .click('#react-burger-menu-btn')
      .click('#logout_sidebar_link.bm-item.menu-item');
});

test('Verify Image Rendering', async t => {

  /*Logs in as problem_user,
  verifies that there are no image error codes,
  verifies that Saucie Labs Onesie has correct image
   */

  await t
      .typeText('#user-name.input_error.form_input', `problem_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)
      .click('#login-button')

  var images        = Selector('img');
  var count         = await images.count;
  var requestsCount = 0;
  var statuses      = [];

  var getRequestResult = ClientFunction(url => {
    return new Promise(resolve => {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url);

      xhr.onload = function () {
        resolve(xhr.status);
      };

      xhr.send(null);
    });
  });


  for (var i = 0; i < count; i++) {
    var url = await images.nth(i).getAttribute('src');

    if (!url.startsWith('data')) {
      requestsCount++;

      statuses.push(await getRequestResult(url));
    }
  }

  await t.expect(requestsCount).eql(statuses.length);

  for (const status of statuses)
    await t.expect(status).eql(200);

  /*Checks if Saucie Labs Onesie image exists*/
  await t.expect(Selector('img[src="static/media/red-onesie-1200x1500.1b15e1fa.jpg"]').exists).ok()
});

test('Verify Page Loading Time', async t => {

  /*Enter credentials for performance_glitch_user,
  takes timestamp,
  logs in,
  verifies that timestamp isn't more than 2s before.
   */
  await t
      .typeText('#user-name.input_error.form_input', `performance_glitch_user`)
      .typeText('#password.input_error.form_input', `secret_sauce`)

  const timeBefore = performance.now();

  await t.click('#login-button')

  const timeAfter = performance.now();

  await t.expect(timeAfter - TimeBefore).lt(2000)
});