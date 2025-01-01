"use client";

const storage = {
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },
  
  getItem: (key: string) => {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving data:', error);
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
