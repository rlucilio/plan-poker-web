import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  const createService = () => {
    storageService = new StorageService();
  };

  it('verify method setValue success scenario', () => {
    const key = 'key';
    const value = 'value';

    createService();
    storageService.setValue(key, value);

    const result = window.sessionStorage.getItem(key);

    expect(result).toEqual(value);
  });

  it('verify method setValue error', () => {
    const key = '';
    const value = 'value';

    createService();

    expect(() => {
      storageService.setValue(key, value);
    }).toThrow('Params invalid');
  });

  it('verify method setObject success scenario', () => {
    const key = 'key';
    const value = { prop: 'value' };

    createService();
    storageService.setObject(key, value);
    const result = window.sessionStorage.getItem(key);

    expect(result).toEqual(JSON.stringify(value));
  });

  it('verify method setObject error', () => {
    const key = '';
    const value = { prop: 'value' };

    createService();

    expect(() => {
      storageService.setObject(key, value);
    }).toThrow('Params invalid');
  });
});
