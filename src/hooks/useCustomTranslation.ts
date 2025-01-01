import { useTranslation } from 'react-i18next';

const useCustomTranslation = (preString?: string) => {
  const { t: translator } = useTranslation();

  const t = (key: string) => {
    return translator(preString ? preString + '.' + key : key);
  }

  return t;
}

export default useCustomTranslation;