import { test, expect, APIRequestContext } from '@playwright/test';
import { UserEntity } from '../types/petStoreUser';

import { SimplePetEntity } from '../types/pet';
import SoldPets from '../models/SoldPets';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://petstore.swagger.io/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  });
})

test.afterAll(async () => {
  // Dispose all responses.
  await apiContext.dispose();
});


test('Create and Retrieve User', async () => {
    const userData: UserEntity = {
        "username": "eilynb",
        "firstName": "eilyn",
        "lastName": "botello",
        "email": "botelloeilyn@gmail.com",
        "password": "passQA",
        "phone": "123466",
        "userStatus": 0
      };

    const userRequestResponse = await apiContext.post(
        '/v2/user', 
        { data: userData }
    );

    expect(userRequestResponse.ok()).toBeTruthy();

    const userByUsernameRequestData = await apiContext.get(`/v2/user/${userData.username}`)

    const body = await userByUsernameRequestData.json();

    expect(body.username).toBe(userData.username)
});

test('List Sold Pet Names', async () => {
    const response = await apiContext.get('/v2/pet/findByStatus?status=sold')

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    const soldPetData = body.map((pet: SimplePetEntity) => {
        return {
         id: pet.id,
         name:pet.name
        }
     });

     const soldPets = new SoldPets(soldPetData)

     soldPets.getCountSoldReport();
});