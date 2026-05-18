import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'ourStory',
      title: 'Origin Story Section',
      type: 'object',
      fields: [
        { name: 'ourStory', title: 'Our Story (Eyebrow)', type: 'string' },
        { name: 'passageTitle', title: 'Passage Title', type: 'string' },
        { name: 'paragraphs', type: 'array', of: [{ type: 'text' }] },
        { 
          name: 'ourStoryStats', 
          title: 'Our Story Stats',
          type: 'array', 
          of: [
            { 
              type: 'object', 
              fields: [
                { name: 'label', type: 'string' },
                { name: 'value', type: 'string' }
              ]
            }
          ] 
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'subCaption', title: 'Sub Caption', type: 'string' },
            { name: 'tag', title: 'Badge Tag (e.g. the OG crew)', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'values',
      title: 'Mission & Values Section',
      type: 'object',
      fields: [
        { name: 'valuesLabel', title: 'Values Label (Eyebrow)', type: 'string' },
        { name: 'passageTitle', title: 'Passage Title', type: 'string' },
        { 
          name: 'items', 
          type: 'array', 
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', description: 'Emoji icon' },
                { name: 'title', type: 'string' },
                { name: 'description', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'foundersHeader',
      title: 'Founders Section Header',
      type: 'object',
      fields: [
        { name: 'foundersLabel', title: 'Founders Label (Eyebrow)', type: 'string' },
        { name: 'passageTitle', title: 'Passage Title', type: 'string' }
      ]
    }),
    defineField({
      name: 'mainFounder',
      title: 'Featured Founder',
      type: 'object',
      fields: [
        { name: 'initials', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'bio', type: 'text' }
      ]
    }),
    defineField({
      name: 'founders',
      title: 'Co-Founders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'initials', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'title', type: 'string', description: 'e.g., Co-founder' },
            { name: 'bio', type: 'text' }
          ]
        }
      ]
    }),
    defineField({
      name: 'whyNalivu',
      title: 'Why Nalivu Section',
      type: 'object',
      fields: [
        { name: 'whyNalivuLabel', title: 'Why Nalivu Label (Eyebrow)', type: 'string' },
        { name: 'passageTitle', title: 'Passage Title', type: 'string' },
        { name: 'description', type: 'text' },
        {
          name: 'checks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'detail', type: 'string' }
              ]
            }
          ]
        },
        {
          name: 'glance',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'value', type: 'string' },
                { name: 'highlight', type: 'boolean' }
              ]
            }
          ]
        }
      ]
    })
  ]
})
