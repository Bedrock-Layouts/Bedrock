type Controls =
  | {
      control: "text";
      initialValue: string;
    }
  | {
      control: "number";
      initialValue: number;
    }
  | {
      control: "boolean";
      initialValue: boolean;
    }
  | {
      control: "select";
      initialValue: string;
      options: string[];
    };

type ArgDetails = {
  description: string;
  defaultValue?: string;
  summary: string;
} & Controls;

export type ArgType = Record<string, ArgDetails>;
