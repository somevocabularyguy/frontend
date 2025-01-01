"use client";

const storage = {
  setItem: (key: string, value: any) => {
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },
  
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    try {
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return value
    }
  },
  
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },
  
  clearAll: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};

export default storage;
