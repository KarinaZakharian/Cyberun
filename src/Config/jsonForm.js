export const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Nom' },
    countries: {
      type: 'array',
      title: 'Pays',
      items: {
        type: 'object',
        properties: {
          country: { type: 'string', title: 'Pays' },
          percentage: { type: 'number', title: 'Pourcentage', minimum: 0, maximum: 100 }
        },
        required: ['country', 'percentage']
      }
    }
  },
  required: ['name']
};
export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name"
    },
    {
      type: "Control",
      scope: "#/properties/countries",
      options: {
        detail: {
          type: "HorizontalLayout", 
    
          elements: [
            {
              type: "Control",
              scope: "#/properties/country",
              options: {
                autocomplete: true  
              }
            },
            {
              type: "Control",
              scope: "#/properties/percentage",
              options: {
                custom: true 
              }
            }
          ]
        }
      }
    }
  ]
};