import { useTranslation } from 'react-i18next';

const useCustomTranslation = (preString?: string) => {
  const { t: translator } = useTranslation();

  const t = (key: string) => {
    return translator(preString ? preString + '.' + key : key);
  }

  const returnKey = (key: string) => {
    return preString ? preString + '.' + key : key;
  }

  return { t, returnKey };
}

export default useCustomTranslation;