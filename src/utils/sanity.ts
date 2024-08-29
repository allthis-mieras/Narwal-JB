import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";



/// Definieer je interfaces
export interface Homepage {
  _type: "page"; 
  title: string;
  homepageHero: {
    heroText: string;
    slides: Slide[];
  };
  homepageFeatured: {
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
    url: string;
  };
  caption?: string;
}




export interface Post {
  _id: string;
  title: string;
  slug: Slug;
  _createdAt: string;
  excerpt: string;
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
  url?: string;
  category?: string;
  body: PortableTextBlock[];  // Rijke tekst content
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
          _key,
          _type,
          asset->{
            _id,
            url
          },
          caption
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
