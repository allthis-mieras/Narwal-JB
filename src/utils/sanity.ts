import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";



/// Definieer je interfaces
export interface Homepage {
  _type: "page"; 
  title: string;
  hero: {
    heroText: string;
    heroSlides: Slide[];
  };
  highlight: {
    text: string;
    button: {
      url: string;
      label: string;
    };
    image: ImageAsset;
  };
}

export interface Slide {
  _key: string;
  _type: string;
  asset: {
    _id: string;
    url: string;  // Dit veld bevat nu de URL van de afbeelding
  };
  caption?: string;
}


export interface Post {
  _id: string;
  title: string;
  slug: Slug;
  _createdAt: string;
  excerpt: string;
  mainImage: ImageAsset;
  url?: string;
  category?: string;
  body: PortableTextBlock[];
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

export interface ImageAsset {
  _type: 'image';
  asset: {
    _ref: string;  // Reference to the image asset
    _type: 'reference';
  };
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
      hero{
        heroText,
        heroSlides[]{
          _key,
          asset->{
            _id,
            url
          },
          caption
        }
      },
      highlight{
        text,
         button {
            url->{
              slug
            },
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
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      _createdAt,
      excerpt,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      url,
      category,
      body
    }`,
    { slug }
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
