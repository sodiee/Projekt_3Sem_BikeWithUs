// Core test

import { deleteCustomer } from '/core.js'; // importer funktionen der skal testes
import fetchMock from 'jest-fetch-mock';

describe('deleteCustomer', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // reset mock mellem tests
  });

  it('deletes a customer successfully', async () => {
    fetchMock.mockResponseOnce('', { status: 204 }); // simulerer en fiktiv server 

    const customerID = '123';
    const redirectSpy = jest.spyOn(window.location, 'assign'); // checker om deleteCustomer bliver kaldt korrekt

    await deleteCustomer(customerID);

    expect(fetchMock).toHaveBeenCalledWith(`/customers/${customerID}`, {
      method: 'DELETE'
    });
    expect(redirectSpy).toHaveBeenCalledWith('/customers');
  });

  it('handles delete failure', async () => {
    fetchMock.mockResponseOnce('', { status: 500 }); // mock en fejl

    const customerID = '456';
    const alertSpy = jest.spyOn(window, 'alert'); // spy på alert

    await deleteCustomer(customerID);

    expect(fetchMock).toHaveBeenCalledWith(`/customers/${customerID}`, {
      method: 'DELETE'
    });
    expect(alertSpy).toHaveBeenCalledWith('Der skete en fejl.');
  });
});