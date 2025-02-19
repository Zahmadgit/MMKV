import { MMKV } from 'react-native-mmkv';

export const mmkvInstance = new MMKV({
    id: 'secureStorage',
    encryptionKey: 'securelolz'
});

// Helper functions
export const storage = {
    set: (key, value) => {
        mmkvInstance.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
    },
    getString: (key) => mmkvInstance.getString(key),
    getNumber: (key) => mmkvInstance.getNumber(key),
    getBoolean: (key) => mmkvInstance.getBoolean(key),
    getObject: (key) => {
        const jsonString = mmkvInstance.getString(key);
        return jsonString ? JSON.parse(jsonString) : null;
    },
    delete: (key) => mmkvInstance.delete(key),
};