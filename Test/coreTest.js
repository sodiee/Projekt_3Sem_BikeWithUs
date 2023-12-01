// Core test

import { deleteCustomer } from '/core.js'; // Import the function you want to test
import fetchMock from 'jest-fetch-mock';

describe('deleteCustomer', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it('deletes a customer successfully', async () => {
    fetchMock.mockResponseOnce('', { status: 204 }); // Simulates fictive server answer. 

    const customerID = '123';
    const redirectSpy = jest.spyOn(window.location, 'assign'); // Checks if they get called correctly by deleteCustomer

    await deleteCustomer(customerID);

    expect(fetchMock).toHaveBeenCalledWith(`/customers/${customerID}`, {
      method: 'DELETE'
    });
    expect(redirectSpy).toHaveBeenCalledWith('/customers');
  });

  it('handles delete failure', async () => {
    fetchMock.mockResponseOnce('', { status: 500 }); // Mock a failed response

    const customerID = '456';
    const alertSpy = jest.spyOn(window, 'alert'); // Spy on window.alert

    await deleteCustomer(customerID);

    expect(fetchMock).toHaveBeenCalledWith(`/customers/${customerID}`, {
      method: 'DELETE'
    });
    expect(alertSpy).toHaveBeenCalledWith('Der skete en fejl.');
  });
});