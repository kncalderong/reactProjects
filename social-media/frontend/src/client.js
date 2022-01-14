//to connect front end with back end of sanity

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID, //this comes from 'sanity manage command'
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN, //comes from sanity manage api token generate new one deploy editor
});

//documentaion on sanity docs, about how to handle images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
