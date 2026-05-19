import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'organization', type: 'string' }),
    defineField({ name: 'website', type: 'string' }),
    defineField({ name: 'subject', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'submittedAt', type: 'datetime', initialValue: () => new Date().toISOString() })
  ]
})
