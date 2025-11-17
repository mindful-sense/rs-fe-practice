import * as z from "zod";
import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "./constants";

interface RangeStringField {
  min: number;
  max: number;
}

type RangeStringFieldOptional = Partial<RangeStringField>;

const createRangeStringField = ({ min, max }: RangeStringField): z.ZodString =>
  z
    .string()
    .trim()
    .min(min, { error: `Min ${min} characters` })
    .max(max, { error: `Max ${max} characters` });

export const createLoginField = ({
  min = LOGIN_MIN_LENGTH,
  max = LOGIN_MAX_LENGTH,
}: RangeStringFieldOptional = {}) => createRangeStringField({ min, max });

export const createPasswordField = ({
  min = PASSWORD_MIN_LENGTH,
  max = PASSWORD_MAX_LENGTH,
}: RangeStringFieldOptional = {}) => createRangeStringField({ min, max });

export const createNonEmptyStringField = (fieldName?: string): z.ZodString =>
  z
    .string()
    .trim()
    .nonempty(fieldName ? { error: `Fill in ${fieldName}` } : undefined);
