/* global fixture */

import { Selector } from 'testcafe';

/* The fixture will go to the correct website
at the login page you will find all the different users and pw for 
the assigments, Good luck! */
fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`;


/* Run it and correct this test */
test('Test1', async t => {
  await t
  .expect(Selector('title').innerText).eql('Swag Labs');
});

/* Use the locked_out_user and check if you get a error msg */
test('Test2', async t =>  {
  await t
  .typeText('#user-name', 'locked_out_user')
  .typeText('#password', 'secret_sauce')
  .click('#login-button')
  .expect('Epic sadface: Sorry, this user has been locked out.').ok();
});

/* Login with problem_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout (HINT: test should fail) */
test('Test3', async t =>  {
  await t
  .typeText('#user-name', 'problem_user')
  .typeText('#password', 'secret_sauce')
  .click('#login-button')
  .click('#add-to-cart-sauce-labs-onesie')
  .click('#shopping_cart_container')
  .click('#checkout')
  .typeText('#first-name', 'Marcus')
  .typeText('#last-name', 'Bengtsson')
  .typeText('#postal-code', '25449')
  .click('#continue')
  .click('#shopping_cart_link')
  .expect('#inventory_item_name').contains('Sauce Labs Onesie');
});

/* Login with standard_user
 change the sorting of products 
 to 'Price (Low to High)'
 verify if its correct */
test('Test4', async t =>  {
  await t
  .typeText('#user-name', 'standard_user')
  .typeText('#password', 'secret_sauce')
  .click('#login-button')
  .click('#header_container > div.header_secondary_container > div.right_component > span > span')
  .click('#header_container > div.header_secondary_container > div.right_component > span > select > option:nth-child(3)')
  //.expect('PRICE (LOW TO').eql('PRICE (LOW TO');
  //.expect('#header_container > div.header_secondary_container > div.right_component > span > select').contains('PRICE (LOW TO');
});

/* Login with standard_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout */
test('Test5', async t =>  {
  await t
  .typeText('#user-name', 'standard_user')
  .typeText('#password', 'secret_sauce')
  .click('#login-button')
  .click('#add-to-cart-sauce-labs-onesie')
  .click('#shopping_cart_container')
  .click('#checkout')
  .typeText('#first-name', 'Marcus')
  .typeText('#last-name', 'Bengtsson')
  .typeText('#postal-code', '25449')
  .click('#continue')
  .click('#finish')
  .click('#react-burger-menu-btn')
  .click('#logout_sidebar_link');
});

/* BONUS 1: Use problem_user and see if all
images render properly. (Hint: test should fail */
test.skip('Test6', async t =>  {

});

/* BONUS 2: Use performance_glitch_user
and verify that the website have good performance.
(Hint: set a threshold, test should fail with
performance_glitch_user and it should succeed 
with standard_user */
test.skip('Test7', async t =>  {
  
});
