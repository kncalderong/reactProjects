export default {
  name: "pin",
  title: "Pin",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "destination",
      title: "Destination",
      type: "url",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }, //this makes the image responsive
    {
      name: "userId",
      title: "UserID",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy", //the type points to itself because it will be a reference
    },
    {
      name: "save",
      title: "Save",
      type: "array", //to save multiples pins
      of: [
        {
          //this descrives the type of elements of the array
          type: "save", //this points to a new schema 'save', the new schema will be a document with different fields, like name, id,...
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "comment",
        },
      ],
    },
  ],
};
