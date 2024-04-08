import { useDirection } from "@mantine/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useAppDirection() {
    const {i18n: { language } } = useTranslation()
    const { setDirection } = useDirection();
    console.log(language);

    useEffect(() => {
        if (language === "ar") {
          setDirection('rtl');
        } else {
          setDirection('ltr');
        }
      }, [language]);
    
    return null
}