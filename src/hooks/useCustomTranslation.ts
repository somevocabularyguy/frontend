import { useTranslation } from 'react-i18next';

const useCustomTranslation = (preString?: string) => {
  const { t: translator } = useTranslation();

  const t = (key: string) => {
    if (preString) {
      return translator(preString + '.' + key)
    }
    return translator(key);
  }
  return t;
}

export default useCustomTranslation;