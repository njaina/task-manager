import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  // Lire la valeur initiale à partir du Local Storage
  // ou utiliser l'initialValue fournie
  const storedValue = localStorage.getItem(key);
  const initialStoredValue = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState<T>(initialStoredValue);

  // Mettre à jour la valeur dans le Local Storage chaque fois qu'elle change
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useLocalStorage;