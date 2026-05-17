import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'impactStory',
  title: 'Impact Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'name',
      title: 'Person Name (e.g., Meena, 17)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g., Education)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location (e.g., Krishnagiri, Tamil Nadu)',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      description: 'Used for cards and listing pages',
    }),
    defineField({
      name: 'content',
      title: 'Main Article Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full story article (Portable Text)',
    }),
    defineField({
      name: 'image',
      title: 'Story Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text' },
            { name: 'attr', type: 'string', title: 'Attribution' }
          ]
        }
      ]
    })
  ]
})
