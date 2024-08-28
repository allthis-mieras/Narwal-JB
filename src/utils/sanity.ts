import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";



// Definieer je interfaces
export interface Homepage {
  _type: "homepage";
  title: string;
  heroText: string;
  slides: Slide[];
  featuredText: string;
  featuredImage: ImageAsset;
  featuredButton: {
    url: string;
    label: string;
  };
}

export interface Slide {
  _key: string;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
}

export interface ImageAsset {
  _id: string;
  url: string;
}



export interface Post {
  url: any;
  category: unknown;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

// Definieer je interfaces
export interface Homepage {
  _type: "homepage";
  title: string;
  heroText: string;
  slides: Slide[];
  featuredText: string;
  featuredImage: ImageAsset;
  featuredButton: {
    url: string;
    label: string;
  };
}

export interface Slide {
  _key: string;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
}

export interface ImageAsset {
  _id: string;
  url: string;
}


export interface Page {
  _type: "page";
  _createdAt: string;
  title?: string;
  slug: Slug;
  heroImage?: ImageAsset;
  heroText?: PortableTextBlock[];
  content: ContentModule[];
}

export interface ContentModule {
  _type: string;
  [key: string]: any;
}


export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

// Fetch Homepage Data
export async function getHomepage(): Promise<Homepage> {
  return await sanityClient.fetch(
    groq`*[_type == "page" && type == "homepage"][0]{
      _type,
      title,
      homepageHero{
        heroText,
        slides[]{
          _type,
          asset->{
            _id,
            url
          }
        }
      },
      homepageFeatured{
        text,
        button{
          url,
          label
        },
        image{
          asset->{
            _id,
            url
          }
        }
      }
    }`
  );
}



export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

// Fetch About Page by Slug
export async function getAboutPage(): Promise<Page> {
  return await sanityClient.fetch(
    groq`*[_type == "page" && slug.current == "about"][0]{
      title,
      pageText,
      content[]{
        ...,
        _type == "imageBlock" => {
          _type,
          _key,
          image{
            asset->{
              _id,
              url
            },
            alt,
            caption
          }
        }
      },
      heroImage{
        asset->{
          _id,
          url
        }
      }
    }`
  );
}
