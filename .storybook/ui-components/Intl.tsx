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

export function NameSpace({ ns }: { ns: string }) {
  const { i18n } = useTranslation();
  i18n.loadNamespaces(ns);
  return null;
}
