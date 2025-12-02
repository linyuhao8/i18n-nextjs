export type Locale = "en" | "zh";

export type Messages = {
  [namespace: string]: {
    [key: string]: string;
  };
};
