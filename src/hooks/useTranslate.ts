import { useAppSelector } from '@/store/store';

const useTranslate = (): (text: string) => void => {
  const translateFrom = useAppSelector(state => state.userSettings.translateFrom);
  const translateTo = useAppSelector(state => state.userSettings.translateTo);

  const translate = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/?sl=${translateFrom}&tl=${translateTo}&text=${encodedText}&op=translate`;

    window.open(url, '_blank');
  }

  return translate;
}

export default useTranslate;