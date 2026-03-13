import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeAnimeFigureFields {
  name: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  image?: EntryFieldTypes.AssetLink;
  pricing: EntryFieldTypes.Symbol;
  terjual?: EntryFieldTypes.Integer;
}

export type TypeAnimeFigureSkeleton = EntrySkeletonType<
  TypeAnimeFigureFields,
  "animeFigure"
>;
export type TypeAnimeFigure<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeAnimeFigureSkeleton, Modifiers, Locales>;

export interface TypeBlogFields {
  title: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  body?: EntryFieldTypes.RichText;
  image?: EntryFieldTypes.AssetLink;
}

export type TypeBlogSkeleton = EntrySkeletonType<TypeBlogFields, "blog">;
export type TypeBlog<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogSkeleton, Modifiers, Locales>;

export interface TypeEkorNimeTestimoniFields {
  profile: EntryFieldTypes.AssetLink;
  comment?: EntryFieldTypes.Symbol;
  nama: EntryFieldTypes.Symbol;
}

export type TypeEkorNimeTestimoniSkeleton = EntrySkeletonType<
  TypeEkorNimeTestimoniFields,
  "ekorNimeTestimoni"
>;
export type TypeEkorNimeTestimoni<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeEkorNimeTestimoniSkeleton, Modifiers, Locales>;

export interface IAsset {
  sys: { id: string };
  fields: {
    file: {
      url: string;
      details?: any;
      fileName?: string;
      contentType?: string;
    };
  };
}
