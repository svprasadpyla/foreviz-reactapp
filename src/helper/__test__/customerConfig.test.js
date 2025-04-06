import { getCustomerName , loadConfig } from "../customerConfig";
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();
process.env.REACT_APP_CUSTOMER_NAME = "mockCustomer";

describe('getCustomerName', () => {
  it('should return the customer name from the environment variable', () => {
    const customerName = getCustomerName();
    expect(customerName).toBe('mockCustomer');
  });
});

describe('loadConfig', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should load config based on customer name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ key: 'value' }));

    const data = await loadConfig();

    expect(fetchMock).toHaveBeenCalledWith('/config/mockCustomer.json');
    expect(data).toEqual({ key: 'value' });
  });

  it('should load default config if there is an error loading based on customer name', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));
   
    const defaultConfig = { key: 'default value' };
    fetchMock.mockResponseOnce(JSON.stringify(defaultConfig));
   
    const data = await loadConfig();
   
    expect(fetchMock).toHaveBeenCalledWith('/config/mockCustomer.json');
    expect(fetchMock).toHaveBeenCalledWith('/config/foreviz.json');
    expect(data).toEqual(defaultConfig);
  });
});
