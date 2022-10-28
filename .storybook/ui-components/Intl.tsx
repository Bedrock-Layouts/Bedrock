import React from "react";
import { UseTranslationOptions, useTranslation } from "react-i18next";

export const Intl = ({
  children,
  options,
}: {
  children: string;
  options?: UseTranslationOptions;
}) => {
  const { t } = useTranslation();
  return <>{t(children, options)}</>;
};
